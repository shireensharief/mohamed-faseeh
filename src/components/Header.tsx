"use client";

import { useEffect, useState } from "react";
import { nav, person } from "@/data/content";
import ThemeToggle from "./ThemeToggle";
import { asset } from "@/lib/asset";

export default function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Highlight the section that owns the middle band of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["home", ...nav.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <a className="monogram" href="#home" aria-label={`${person.name}, back to top`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/logo.webp")} alt="" width={48} height={48} />
      </a>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((o) => !o)}
      >
        Menu <b aria-hidden="true">+</b>
      </button>
      <nav id="site-nav" className={`pill-nav${open ? " is-open" : ""}`} aria-label="Sections">
        {nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? "true" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  );
}
