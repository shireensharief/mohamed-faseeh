import { certifications, education, roles } from "@/data/content";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-marker">
        <span>04 — THE JOURNEY</span>
        <span>ALWAYS MOVING FORWARD</span>
      </div>
      <div className="section-heading" data-reveal>
        <h2>Experience that{" "}<br /><em>keeps things running.</em></h2>
        <p>From my first AWS deployment{" "}<br />to keeping a global platform up.</p>
      </div>

      <div className="timeline">
        <div className="timeline-track" aria-hidden="true"><span className="timeline-draw" /></div>
        {roles.map((r) => (
          <div className="timeline-item" key={r.period}>
            <div className="timeline-date">
              <span>{r.period}</span>
              <strong>{r.year}</strong>
            </div>
            <article className="role-card" data-reveal>
              <p className="eyebrow">{r.eyebrow}</p>
              <h3>{r.title}</h3>
              <h4>{r.org}</h4>
              <p>{r.summary}</p>
              <div className="tags">{r.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </article>
          </div>
        ))}
      </div>

      <div className="education">
        <div>
          <p className="eyebrow">{education.label}</p>
          <h3>{education.degree}</h3>
          <p>{education.school}</p>
          <p>{education.detail}</p>
        </div>
        <div>
          <p className="eyebrow">CERTIFICATIONS</p>
          <ul>
            {certifications.map((c) => (
              <li key={c.title}>
                <a href={c.href} target="_blank" rel="noreferrer">{c.title} · LinkedIn Learning ↗</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
