import type { Metadata } from "next";
import Link from "next/link";
import { person } from "@/data/content";
import { asset } from "@/lib/asset";
import MissingPath from "@/components/MissingPath";

export const metadata: Metadata = {
  title: `Incident #404 · Page not found | ${person.name}`,
  robots: { index: false },
};

// Shown for any address that doesn't exist; GitHub Pages serves it as 404.html.
export default function NotFound() {
  return (
    <main className="incident">
      <header className="incident-top">
        <Link className="monogram" href="/" aria-label="Back to home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/logo.webp")} alt="" width={48} height={48} />
        </Link>
        <span className="incident-status"><i /> Investigating</span>
      </header>

      <div className="incident-grid">
        <section className="incident-report">
          <p className="eyebrow">SEV-3 · INCIDENT #404</p>
          <h1>Page not <em>found.</em></h1>
          <p className="incident-lede">
            The page you asked for isn’t part of this deployment. On-call has been paged (it’s me).
          </p>

          <ol className="incident-timeline">
            <li>
              <time>00:00</time>
              <div><b>Detected</b><p>Request to <MissingPath /> returned 404.</p></div>
            </li>
            <li>
              <time>00:01</time>
              <div><b>Triage</b><p>Checked the dashboards. Every other page is healthy.</p></div>
            </li>
            <li>
              <time>00:02</time>
              <div><b>Mitigation</b><p>Rerouting you to a page that’s up.</p></div>
            </li>
          </ol>

          <div className="incident-rca">
            <p className="tiny-label">ROOT CAUSE ANALYSIS</p>
            <p>Likely a mistyped link or a page that moved. No users were harmed.</p>
          </div>

          <div className="incident-actions">
            <Link className="button primary" href="/">
              Back to home <span aria-hidden="true">→</span>
            </Link>
            <Link className="text-link" href="/#projects">See projects ↗</Link>
            <Link className="text-link" href="/#contact">Contact ↗</Link>
          </div>
        </section>

        <aside className="incident-guide" aria-hidden="true">
          <p className="incident-bubble">This page is down. Let me get you somewhere healthy.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/avatar/avatar.webp")} alt="" />
        </aside>
      </div>
    </main>
  );
}
