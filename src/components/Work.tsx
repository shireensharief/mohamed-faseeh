"use client";

import { useRef, useState } from "react";
import { projects, type Project } from "@/data/content";
import ProjectModal from "./ProjectModal";
import MiniLaptop from "./MiniLaptop";

export default function Work() {
  const [openId, setOpenId] = useState<string | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const open = (id: string, from: HTMLElement) => { opener.current = from; setOpenId(id); };
  const close = () => { setOpenId(null); opener.current?.focus(); };
  const current = projects.find((p) => p.id === openId);

  return (
    <section id="projects" className="section work">
      <div className="section-marker">
        <span>03 — SELECTED WORK</span>
        <span>IDEAS, OUT IN PRODUCTION</span>
      </div>
      <div className="section-heading" data-reveal>
        <h2>Personal <em>projects.</em></h2>
        <p>Pipelines, clusters, guardrails.{" "}<br />Made so the people on call can sleep.</p>
      </div>

      <div className="work-stage">
        <div className="work-window">
          <div className="work-rail">
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onOpen={open} />)}
          </div>
        </div>
        <div className="work-scroll-note" aria-hidden="true">
          <span>KEEP SCROLLING TO EXPLORE</span>
          <svg className="arrow" width="44" height="8" viewBox="0 0 44 8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4h41M38 1l4 3-4 3" />
          </svg>
          <span>{String(projects.length).padStart(2, "0")} PROJECTS / ONE RELIABLE STACK</span>
        </div>
      </div>
      {current && (
        <ProjectModal project={current} index={projects.indexOf(current)} onClose={close} />
      )}
    </section>
  );
}

type CardProps = { project: Project; index: number; onOpen: (id: string, from: HTMLElement) => void };

function ProjectCard({ project: p, index, onOpen }: CardProps) {
  const num = String(index + 1).padStart(2, "0");
  const primary = p.links[0];
  return (
    <article
      className={`project-card${p.featured ? " featured" : ""}${p.personalStamp ? " tinted" : ""}`}
      // The whole card opens the detail view; its own links still work as links.
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a, button")) return;
        onOpen(p.id, e.currentTarget.querySelector<HTMLElement>(".details-link") ?? e.currentTarget);
      }}
    >
      <div className="project-top">
        <span className="tiny-label">{num} / {p.label}</span>
        {primary && (
          <a href={primary.href} target="_blank" rel="noreferrer" aria-label={`${p.title} on ${primary.label}`}>↗</a>
        )}
      </div>
      <div className="project-visual" aria-hidden="true">
        <span className="project-orbit" />
        {p.stamp && <p className="project-stamp">{p.stamp[0]}<br /><em>{p.stamp[1]}</em></p>}
        {p.personalStamp && (
          <span className="personal-stamp">{p.personalStamp.map((l) => <span key={l}>{l}</span>)}</span>
        )}
        <MiniLaptop project={p} num={num} />
        <span className="interface-label">INTERFACE STUDY</span>
      </div>
      <div className="project-copy">
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
        <div className="store-links">
          <button className="details-link" onClick={(e) => onOpen(p.id, e.currentTarget)}>
            View details <span aria-hidden="true">→</span>
          </button>
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
          ))}
        </div>
      </div>
    </article>
  );
}
