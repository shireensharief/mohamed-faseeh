import fs from "node:fs";
import path from "node:path";
import { about, person } from "@/data/content";
import { asset } from "@/lib/asset";
import Badge from "./Badge";

// A real headshot for the ID badge, if one has been added to public/img/.
function findPhoto() {
  for (const name of ["photo.webp", "photo.jpg", "photo.png"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "img", name))) return asset(`/img/${name}`);
  }
  return undefined;
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-marker">
        <span>01 — THE PERSON</span>
        <span>A LITTLE CONTEXT</span>
      </div>
      <div className="about-grid">
        <div className="about-copy" data-reveal>
          <h2>Hi, I’m{" "}<br /><em>{person.name}.</em></h2>
          {about.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          <div className="pills">
            <a href={asset(person.resume)} download>Résumé ↓</a>
            <a href={person.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>

        <Badge photo={findPhoto()} />

        <aside className="quick-facts" data-reveal>
          <p className="eyebrow">A FEW QUICK FACTS</p>
          <dl>
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}{f.arrow && <span aria-hidden="true">↗</span>}</dd>
              </div>
            ))}
          </dl>
          <blockquote>{about.quote[0]}<br />{about.quote[1]}</blockquote>
          <p className="tiny-label">{about.quoteNote}</p>
        </aside>
      </div>
    </section>
  );
}
