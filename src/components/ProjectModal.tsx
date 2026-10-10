"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { projectDetails, type Project } from "@/data/content";

type Lenis = { stop(): void; start(): void };

// Full project write-up, opened from a card. Rendered into <body> because the
// project rail is transformed while pinned, which would break position: fixed.
export default function ProjectModal({ project: p, index, onClose }: { project: Project; index: number; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const detail = projectDetails[p.id];
  const num = String(index + 1).padStart(2, "0");

  useEffect(() => {
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    lenis?.stop();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previousOverflow;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <article className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title" data-lenis-prevent>
        <header className="modal-head">
          <span className="tiny-label">{num} / {p.label}</span>
          <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close project details">×</button>
        </header>

        <h2 id="modal-title">{p.title}</h2>
        <p className="modal-lede">{p.description}</p>
        <div className="modal-actions">
          {p.links.map((l) => (
            <a key={l.href} className="button primary" href={l.href} target="_blank" rel="noreferrer">
              View on {l.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>

        {detail && (
          <>
            <section className="modal-section">
              <p className="eyebrow">KEY RESPONSIBILITIES</p>
              <div className="modal-cards">
                {detail.responsibilities.map((r) => (
                  <div key={r.title} className="modal-card">
                    <h3>{r.title}</h3>
                    <ul>{r.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="modal-section">
              <p className="eyebrow">TECHNOLOGIES USED</p>
              <dl className="modal-tech">
                {detail.technologies.map((t) => (
                  <div key={t.title}>
                    <dt>{t.title}</dt>
                    <dd>{t.items}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="modal-section">
              <p className="eyebrow">KEY OUTCOMES</p>
              <ol className="modal-outcomes">
                {detail.outcomes.map((o, i) => (
                  <li key={o}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{o}</li>
                ))}
              </ol>
            </section>
          </>
        )}
      </article>
    </div>,
    document.body,
  );
}
