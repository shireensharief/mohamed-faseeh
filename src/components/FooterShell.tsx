"use client";

import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { nav, person } from "@/data/content";
import { asset } from "@/lib/asset";

// A one-line shell under the contact links: visitors type a command, it answers on
// the line below (or jumps to a section). Styles in globals.css.
const user = person.firstName.toLowerCase();
const sections = Object.fromEntries(nav.map((n) => [n.label.toLowerCase(), n.id]));
const commands = ["help", "whoami", "ls", ...Object.keys(sections), "resume", "email", "github", "linkedin", "clear", "sudo hire faseeh"];

type Out = { text: string; tone?: "ok" | "err" };

function jumpTo(id: string) {
  const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -20 });
  else el.scrollIntoView({ behavior: "smooth" });
}

function run(raw: string): Out | null {
  const cmd = raw.trim().replace(/\s+/g, " ").toLowerCase();
  if (!cmd) return null;
  if (cmd === "clear") return null;
  if (cmd === "help") return { text: `try: ${commands.filter((c) => c !== "sudo hire faseeh").join(" · ")}` };
  if (cmd === "whoami") return { text: `${person.name} · ${person.role} · ${person.location}` };
  if (cmd === "ls") return { text: `${Object.keys(sections).join("/  ")}/  resume.pdf` };
  if (cmd === "resume") {
    const a = document.createElement("a");
    a.href = asset(person.resume);
    a.download = "";
    a.click();
    return { text: `downloading ${person.resume.slice(1)} ↓`, tone: "ok" };
  }
  if (cmd === "email") {
    navigator.clipboard?.writeText(person.email).catch(() => {});
    return { text: `${person.email}  (copied ✓)`, tone: "ok" };
  }
  if (cmd === "github" || cmd === "linkedin") {
    window.open(person[cmd], "_blank", "noopener");
    return { text: `opening ${cmd === "github" ? "GitHub" : "LinkedIn"} ↗`, tone: "ok" };
  }
  if (cmd === "sudo hire faseeh") {
    setTimeout(() => jumpTo("contact"), 700);
    return { text: "permission granted ✓ opening contact…", tone: "ok" };
  }
  if (cmd.startsWith("sudo")) return { text: `${user} is not in the sudoers file. This incident will be reported.`, tone: "err" };
  const target = sections[cmd.replace(/^cd\s+/, "")];
  if (target) {
    jumpTo(target);
    return { text: `cd ~/${cmd.replace(/^cd\s+/, "")} ✓`, tone: "ok" };
  }
  return { text: `command not found: ${cmd} · try "help"`, tone: "err" };
}

export default function FooterShell() {
  const [value, setValue] = useState("");
  const [out, setOut] = useState<Out | null>(null);
  const history = useRef<string[]>([]);
  const step = useRef(0);
  const box = useRef<HTMLDivElement>(null);

  // Side by side with the form, stretch the contact column down to the Send
  // button's bottom so the shell (pushed to the column's foot in CSS) ends
  // level with it. Measured off the button, not the form, so the progress
  // steps that appear under it after sending don't move the shell; and any
  // height the visitor drags onto the message box is taken back off, so
  // resizing it doesn't move the shell either.
  useEffect(() => {
    const column = box.current?.parentElement;
    const form = column?.parentElement?.querySelector<HTMLFormElement>(".contact-form");
    const button = form?.querySelector<HTMLElement>('button[type="submit"]');
    const message = form?.querySelector<HTMLTextAreaElement>("textarea");
    if (!column || !form || !button || !message) return;
    const restingHeight = message.offsetHeight;
    const wide = window.matchMedia("(min-width: 768px)");
    const align = () => {
      const dragged = Math.max(0, message.offsetHeight - restingHeight);
      column.style.minHeight = wide.matches
        ? `${button.getBoundingClientRect().bottom - dragged - column.getBoundingClientRect().top}px`
        : "";
    };
    const observer = new ResizeObserver(align);
    observer.observe(form);
    wide.addEventListener("change", align);
    align();
    return () => { observer.disconnect(); wide.removeEventListener("change", align); column.style.minHeight = ""; };
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (value.trim()) history.current.push(value);
      step.current = history.current.length;
      setOut(run(value));
      setValue("");
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (!history.current.length) return;
      e.preventDefault();
      const n = history.current.length;
      step.current = Math.max(0, Math.min(n, step.current + (e.key === "ArrowUp" ? -1 : 1)));
      setValue(history.current[step.current] ?? "");
    } else if (e.key === "Tab" && value.trim()) {
      const match = commands.find((c) => c.startsWith(value.trim().toLowerCase()));
      if (match) { e.preventDefault(); setValue(match); }
    }
  }

  return (
    <div className="footer-shell" ref={box}>
      <label className="footer-shell-line">
        <span className="term-prompt" aria-hidden="true"><b>{user}</b>@portfolio <i>~</i> $</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder='type "help"'
          aria-label="Portfolio shell: type a command, for example help"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="go"
        />
      </label>
      <p className={`footer-shell-out${out?.tone ? ` is-${out.tone}` : ""}`} aria-live="polite">
        {out?.text ?? " "}
      </p>
    </div>
  );
}
