"use client";

import { useEffect, useRef, useState } from "react";
import { person, skillFilters, skills, type Skill, type SkillFamily } from "@/data/content";
import { asset } from "@/lib/asset";

type Props = { filter: "all" | SkillFamily; open: Skill | null; setOpen: (s: Skill | null) => void };

const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const user = person.firstName.toLowerCase();

// Toolkit shown as a terminal session: tools are `ls` output, clicking one
// types out `describe <tool>` and prints what it was used for.
export default function SkillsTerminal({ filter, open, setOpen }: Props) {
  const command = open ? `describe ${slug(open.name)}` : "";
  const [typed, setTyped] = useState(0);
  // Until the visitor clicks a tool once, nudge them that the tools are clickable.
  const [explored, setExplored] = useState(false);
  useEffect(() => { if (open) setExplored(true); }, [open]);
  const done = typed >= command.length;
  const bodyRef = useRef<HTMLDivElement>(null);

  // Like a real shell, follow the output down once the description prints.
  useEffect(() => {
    const body = bodyRef.current;
    if (body && open && done) body.scrollTo({ top: body.scrollHeight, behavior: "smooth" });
  }, [open, done]);

  useEffect(() => {
    if (!command) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(command.length);
      return;
    }
    setTyped(0);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTyped(i);
      if (i >= command.length) clearInterval(timer);
    }, 28);
    return () => clearInterval(timer);
  }, [command]);

  const family = open && skillFilters.find((f) => f.id === open.family)?.label;
  const visible = filter === "all" ? skills.length : skills.filter((s) => s.family === filter).length;

  return (
    <div className="laptop">
      <div className="laptop-lid">
        <span className="laptop-camera" aria-hidden="true" />
        <div className="terminal">
          <div className="term-bar">
            <span className="term-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="term-title">{user}@prod: ~/toolkit</span>
            <span className="term-tag" aria-hidden="true">zsh</span>
          </div>

          <div className="term-body" ref={bodyRef} data-lenis-prevent>
            <p className="term-motd">
              Last login: on call, always · <span>a shell full of reliability.</span>
            </p>

            <p className="term-line">
              <Prompt /> ls toolkit/ {filter !== "all" && <span className="term-flag">--family={filter}</span>}
            </p>
            <p className="term-comment"># {visible} of {skills.length} tools</p>
            {!open && (
              <p className="term-hint">
                <span className="term-hint-arrow" aria-hidden="true">↓</span>
                Click any tool to see how I use it
              </p>
            )}

            <div className="term-grid">
              {skills.map((s, i) => (
                <button
                  key={s.name}
                  className={`term-tool${filter !== "all" && filter !== s.family ? " dimmed" : ""}${open?.name === s.name ? " is-active" : ""}${!explored && i === 0 ? " is-hinted" : ""}`}
                  onClick={() => setOpen(open?.name === s.name ? null : s)}
                  aria-pressed={open?.name === s.name}
                >
                  <span className="term-glyph" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(s.icon)} alt="" width={14} height={14} loading="lazy" />
                  </span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>

            <div className="term-output" aria-live="polite">
              <p className="term-line">
                <Prompt /> {command.slice(0, typed)}
                {(!open || !done) && <span className="term-cursor" aria-hidden="true" />}
              </p>
              {open && done ? (
                <div className="term-result">
                  <p><span className="term-key">name</span>{open.name}</p>
                  <p><span className="term-key">family</span>{family?.toLowerCase()} <span className="term-ok">● running</span></p>
                  <p className="term-story">{open.story}</p>
                  {open.project && (
                    <p>
                      <span className="term-key">see it in</span>
                      {open.project.title}{" "}
                      <a href={open.project.href} target="_blank" rel="noreferrer">github ↗</a>
                    </p>
                  )}
                </div>
              ) : (
                !open && <p className="term-comment"># waiting for input…</p>
              )}
            </div>
          </div>

          <div className="term-status" aria-hidden="true">
            <span>[prod] 0:toolkit*</span>
            <span><i className="term-led" /> all systems operational</span>
          </div>
        </div>
      </div>
      <div className="laptop-base" aria-hidden="true"><span className="laptop-notch" /></div>
    </div>
  );
}

function Prompt() {
  return (
    <span className="term-prompt" aria-hidden="true">
      <b>{user}</b>@prod <i>~/toolkit</i> $
    </span>
  );
}
