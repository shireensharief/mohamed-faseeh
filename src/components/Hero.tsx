import fs from "node:fs";
import path from "node:path";
import { person } from "@/data/content";
import { asset } from "@/lib/asset";
import AvatarGuide from "./AvatarGuide";

// Use whichever avatar file has been dropped into public/avatar/, if any.
function findAvatar() {
  for (const name of ["avatar.webp", "avatar.png"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "avatar", name))) return asset(`/avatar/${name}`);
  }
  return undefined;
}

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-ghost" aria-hidden="true">
        <svg viewBox="0 0 1100 260" preserveAspectRatio="xMidYMin meet">
          <text
            x="550" y="226" textAnchor="middle" fill="#e6e3da"
            fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="275" letterSpacing="-22"
          >
            {person.ghost}
          </text>
        </svg>
      </div>

      <div className="hero-topnote">
        <span className="dot" /> FUELING UPTIME. BUILDING RELIABILITY.
      </div>

      <AvatarGuide src={findAvatar()} />

      <div className="hero-copy">
        <p className="eyebrow">
          {person.name.toUpperCase()} · SITE RELIABILITY ENGINEER · {person.location.toUpperCase()}
        </p>
        <h1>
          <span className="sr-only">{person.name} — </span>
          Site Reliability
          <br />& Cloud
          <br /><em>Engineer.</em>
        </h1>
        <p className="hero-tagline">
          Fast systems. Calm on-call.
          <br /><strong>Reliable by design.</strong>
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">
            Explore work <span aria-hidden="true">→</span>
          </a>
          <a className="text-link" href="#contact">Let’s talk ↗</a>
          <a className="text-link" href={asset(person.resume)} download>Résumé ↓</a>
        </div>
      </div>

      <div className="hero-aside">
        <p className="tiny-label">FROM FIRST ALERT{" "}<br />TO ROOT CAUSE.</p>
        <p>Quiet on the outside.{" "}<br />Automated underneath.</p>
        <a className="scroll-cue" href="#about" aria-label="Scroll to About">↓</a>
      </div>

      <div className="hero-bottom">
        <span>AWS / KUBERNETES / OBSERVABILITY</span>
        <span>KEEPING SYSTEMS UP. AROUND THE CLOCK.</span>
        <span>SCROLL TO MEET ME ↓</span>
      </div>
    </section>
  );
}
