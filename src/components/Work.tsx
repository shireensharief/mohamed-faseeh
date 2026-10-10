import { projects, type Project } from "@/data/content";

export default function Work() {
  return (
    <section id="projects" className="section work">
      <div className="section-marker">
        <span>03 — SELECTED WORK</span>
        <span>IDEAS, OUT IN PRODUCTION</span>
      </div>
      <div className="section-heading" data-reveal>
        <h2>Things I’ve <em>built.</em></h2>
        <p>Pipelines, clusters, guardrails.{" "}<br />Made so the people on call can sleep.</p>
      </div>

      <div className="work-stage">
        <div className="work-window">
          <div className="work-rail">
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </div>
        <div className="work-scroll-note" aria-hidden="true">
          <span>KEEP SCROLLING TO EXPLORE</span>
          <span className="arrow">⟶</span>
          <span>{String(projects.length).padStart(2, "0")} PROJECTS / ONE RELIABLE STACK</span>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const primary = p.links[0];
  return (
    <article className={`project-card${p.featured ? " featured" : ""}${p.personalStamp ? " tinted" : ""}`}>
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
        <MiniDevice project={p} num={num} />
        <span className="interface-label">INTERFACE STUDY</span>
      </div>
      <div className="project-copy">
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
        <div className="store-links">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
          ))}
        </div>
      </div>
    </article>
  );
}

// A small drawn phone showing a status screen for the project.
function MiniDevice({ project: p, num }: { project: Project; num: string }) {
  const s = p.screen;
  return (
    <div className="mini-device">
      <span className="device-speaker" />
      <div className="mini-screen">
        <div className="ms-top"><span>9:41</span><span>• •</span></div>
        <div className="ms-kicker">{s.kicker} / {num}</div>
        <div className="ms-title">{s.title}</div>
        <div className="ms-sub">Healthy. Observed. Automated.</div>
        <div className="ms-banner">
          <small>STATUS, LIVE</small>
          <b>{s.banner}</b>
          <svg viewBox="0 0 100 16" preserveAspectRatio="none">
            <polyline points="0,12 14,9 24,11 36,5 48,8 60,4 72,9 84,6 100,8" fill="none" stroke="#fff" strokeWidth="1.2" opacity=".85" />
          </svg>
        </div>
        <div className="ms-h">Overview</div>
        {s.rows.map(([a, b]) => (
          <div className="ms-row" key={a}><i /><span><b>{a}</b><small>{b}</small></span></div>
        ))}
      </div>
    </div>
  );
}
