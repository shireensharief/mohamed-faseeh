// A small monitoring panel for the observability card: one heartbeat line per
// system, a bright trace sweeping along each, and a green "healthy" dot.
// Illustrative only, so it carries no numbers. Styles in globals.css.
const TRACE = "M0 8 H22 L25 8 L27 2 L29 11 L31 8 H62 L65 8 L67 2 L69 11 L71 8 H120";

export default function Heartbeat({ systems }: { systems: string[] }) {
  return (
    <div className="heartbeat" aria-hidden="true">
      {systems.map((name, i) => (
        <div key={name} className="heartbeat-row" style={{ "--beat-delay": `${-i * 0.9}s` } as React.CSSProperties}>
          <span>{name}</span>
          <svg viewBox="0 0 120 12" preserveAspectRatio="none">
            {/* The bright copy only shows through a narrow window that slides along the line. */}
            <clipPath id={`heartbeat-window-${i}`}>
              <rect className="heartbeat-window" x="-16" y="-2" width="16" height="16" />
            </clipPath>
            <path className="heartbeat-base" d={TRACE} />
            <path className="heartbeat-trace" d={TRACE} clipPath={`url(#heartbeat-window-${i})`} />
          </svg>
          <i />
        </div>
      ))}
    </div>
  );
}
