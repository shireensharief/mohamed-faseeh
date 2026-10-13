import { moments, stats } from "@/data/content";
import CountUp from "./CountUp";
import Heartbeat from "./Heartbeat";

export default function Moments() {
  return (
    <section id="moments" className="section moments">
      <div className="section-marker">
        <span>05 — IMPACT</span>
        <span>THE WORK ADDS UP</span>
      </div>
      <h2 data-reveal>Small fixes.{" "}<br /><em>Meaningful uptime.</em></h2>

      <div className="stats">
        {stats.map((s) => (
          <div key={s.label}>
            {"text" in s ? (
              <strong>{s.text}</strong>
            ) : (
              <strong><CountUp value={s.value!} />{s.suffix}</strong>
            )}
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="moment-cards">
        {moments.map((m) => (
          <article key={m.eyebrow} data-reveal>
            {"monitor" in m && m.monitor ? (
              <Heartbeat systems={m.monitor} />
            ) : (
              <span className="moment-symbol">{m.symbol}</span>
            )}
            <p className="eyebrow">{m.eyebrow}</p>
            <h3>{m.title}</h3>
            <p>{m.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
