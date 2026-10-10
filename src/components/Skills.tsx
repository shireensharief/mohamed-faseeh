"use client";

import { useState } from "react";
import { alsoInToolkit, skillFilters, skills, type Skill, type SkillFamily } from "@/data/content";

export default function Skills() {
  const [filter, setFilter] = useState<"all" | SkillFamily>("all");
  const [open, setOpen] = useState<Skill | null>(null);

  return (
    <section id="skills" className="section skills">
      <div className="section-marker">
        <span>02 — THE TOOLKIT</span>
        <span>MADE TO WORK TOGETHER</span>
      </div>
      <div className="skills-layout">
        <div className="skills-copy" data-reveal>
          <p className="eyebrow">CLOUD-NATIVE THINKING. PRODUCTION-GRADE HABITS.</p>
          <h2>The stack,{" "}<br /><em>always on.</em></h2>
          <p>The tools change. The goal doesn’t: systems that stay fast, secure and up, and an on-call that stays quiet.</p>
          <div className="skill-note">
            <svg width="50" height="34" viewBox="0 0 50 34" aria-hidden="true">
              <path d="M2 32 L46 6 M46 6 L33 6 M46 6 L41 18" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
            <p>Every icon has a story.{" "}<br /><strong>Open one to see the work behind it.</strong></p>
          </div>
          <div className="more-skills">
            <p className="tiny-label">ALSO IN THE TOOLKIT</p>
            <ul>{alsoInToolkit.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>

        <div className="skill-experience" data-reveal>
          <div className="filter-chips" role="group" aria-label="Filter technologies">
            {skillFilters.map((f) => (
              <button key={f.id} aria-pressed={filter === f.id} onClick={() => { setFilter(f.id); setOpen(null); }}>
                {f.label}
              </button>
            ))}
          </div>

          <div className="skill-phone">
            <div className="phone-status" aria-hidden="true">
              <span>9:41</span><i /><span>▮▮▮ ▰</span>
            </div>
            <div className="phone-home">
              <div className="phone-greeting">
                <span>BUILT FOR PRODUCTION.</span>
                <strong>A pocketful{" "}<br />of reliability.</strong>
                <small>My engineering toolkit</small>
              </div>
              <div className="app-grid">
                {skills.map((s) => (
                  <button
                    key={s.name}
                    className={`tech-app${filter !== "all" && filter !== s.family ? " dimmed" : ""}`}
                    onClick={() => setOpen(s)}
                    aria-label={`${s.name}: see how it is used`}
                  >
                    <span className={`app-icon family-${s.family}`} aria-hidden="true">{s.glyph}</span>
                    <span>{s.name}</span>
                  </button>
                ))}
              </div>
              <div className="phone-dock">
                <span aria-hidden="true">⌘</span>
                <p>Tap a technology.{" "}<br /><strong>See what’s behind the icon.</strong></p>
                <span aria-hidden="true">↗</span>
              </div>
            </div>

            {open && (
              <div className="skill-detail" role="dialog" aria-label={open.name}>
                <button className="app-back" onClick={() => setOpen(null)}>← Back to toolkit</button>
                <span className={`app-icon family-${open.family}`} aria-hidden="true">{open.glyph}</span>
                <p className="tiny-label">{skillFilters.find((f) => f.id === open.family)?.label.toUpperCase()}</p>
                <h3>{open.name}</h3>
                <p>{open.story}</p>
                <div className="skill-project">
                  <span>{open.project.label}</span>
                  <strong>{open.project.title}</strong>
                  {open.project.href && (
                    <a href={open.project.href} target="_blank" rel="noreferrer">View on GitHub ↗</a>
                  )}
                </div>
              </div>
            )}
            <span className="home-indicator" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
