"use client";

import { useState } from "react";
import { skillFilters, type Skill, type SkillFamily } from "@/data/content";
import SkillsTerminal from "./SkillsTerminal";

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
            <p>Every tool has a story.{" "}<br /><strong>Click one in the terminal to see the work behind it.</strong></p>
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

          <SkillsTerminal filter={filter} open={open} setOpen={setOpen} />
        </div>
      </div>
    </section>
  );
}
