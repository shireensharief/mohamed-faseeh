"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { person } from "@/data/content";
import { asset } from "@/lib/asset";

// Footer status light. The checks are real: the visitor's browser requests a
// few of the site's own files and times each answer, and the page-load figure
// comes from the browser's own navigation timing. Styles in globals.css.
type Check = { name: string; url: () => string | null };
type Result = { name: string; ok: boolean; code: number | null; ms: number | null };

const CHECKS: Check[] = [
  { name: "Website", url: () => asset("/") },
  { name: "Fonts", url: () => document.querySelector<HTMLLinkElement>('link[rel="preload"][as="font"]')?.href ?? null },
  { name: "Images", url: () => asset("/logo.webp") },
  { name: "Résumé", url: () => asset(person.resume) },
];

async function probe(check: Check): Promise<Result> {
  const url = check.url();
  if (!url) return { name: check.name, ok: false, code: null, ms: null };
  const start = performance.now();
  try {
    const res = await fetch(url, { method: "HEAD", cache: "no-store" });
    return { name: check.name, ok: res.ok, code: res.status, ms: Math.round(performance.now() - start) };
  } catch {
    return { name: check.name, ok: false, code: null, ms: null };
  }
}

const STEP_MS = 450;
const wait = (ms: number) => new Promise((done) => setTimeout(done, ms));

function pageLoadMs() {
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return nav && nav.loadEventEnd > 0 ? Math.round(nav.loadEventEnd - nav.startTime) : null;
}

export default function StatusDot() {
  const [results, setResults] = useState<Result[] | null>(null);
  const [load, setLoad] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [open, setOpen] = useState(false);
  const [checkedAt, setCheckedAt] = useState<string>("");
  const [partial, setPartial] = useState<Result[]>([]);
  const [active, setActive] = useState(-1); // index of the check in flight; CHECKS.length = page load
  const root = useRef<HTMLDivElement>(null);

  // Checks run one after another so the visitor can watch each one. Every
  // step is held on screen for at least STEP_MS; the figure shown is still the
  // real response time, the hold only paces the reveal.
  const run = useCallback(async (paced = true) => {
    setRunning(true);
    setPartial([]);
    setResults(null);
    setLoad(null);
    const out: Result[] = [];
    for (let i = 0; i < CHECKS.length; i++) {
      setActive(i);
      const [r] = await Promise.all([probe(CHECKS[i]), paced ? wait(STEP_MS) : null]);
      out.push(r);
      setPartial([...out]);
    }
    setActive(CHECKS.length);
    if (paced) await wait(STEP_MS);
    setLoad(pageLoadMs());
    setResults(out);
    setActive(-1);
    setCheckedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    setRunning(false);
  }, []);

  // First run once the page has finished loading, so the label is never a guess.
  useEffect(() => {
    const start = () => setTimeout(() => run(false), 400);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [run]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const failed = results?.filter((r) => !r.ok).length ?? 0;
  const state = !results ? "checking" : failed ? "degraded" : "ok";
  const label = state === "checking" ? "Checking systems…" : failed ? `${failed} check${failed > 1 ? "s" : ""} failing` : "All systems operational";

  return (
    <div className="status" ref={root}>
      <button
        type="button"
        className={`status-toggle is-${state}`}
        aria-expanded={open}
        aria-controls="status-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <i aria-hidden="true" />
        {label}
      </button>
      {open && (
        <div className="status-panel" id="status-panel" role="dialog" aria-label="Site status">
          <p className="status-head">
            <span>SITE STATUS</span>
            <span>{running ? "running…" : checkedAt && `checked ${checkedAt}`}</span>
          </p>
          <ul aria-live="polite">
            {CHECKS.map((c, i) => {
              const r = running ? partial[i] : results?.[i];
              const cls = r ? (r.ok ? "is-ok" : "is-down") : active === i ? "is-running" : "is-pending";
              return (
                <li key={c.name} className={cls}>
                  <i aria-hidden="true" />
                  <span>{c.name}</span>
                  <b>{r ? (r.code ? `${r.code} ${r.ok ? "OK" : ""}`.trim() : "unreachable") : active === i ? "checking" : "…"}</b>
                  <em>{r && r.ms !== null ? `${r.ms} ms` : ""}</em>
                </li>
              );
            })}
            <li className={`status-load${active === CHECKS.length ? " is-running" : load === null ? " is-pending" : ""}`}>
              <i aria-hidden="true" />
              <span>Page load</span>
              <b>{load !== null ? `${load} ms` : active === CHECKS.length ? "measuring" : "…"}</b>
              <em />
            </li>
          </ul>
          <button
            type="button"
            className="status-rerun"
            onClick={() => run()}
            disabled={running}
            style={{ "--progress": running ? `${(Math.max(active, 0) / (CHECKS.length + 1)) * 100}%` : "0%" } as React.CSSProperties}
          >
            <span>
              {running
                ? `Running check ${Math.min(active + 1, CHECKS.length + 1)} of ${CHECKS.length + 1}…`
                : results
                  ? `↻ Re-run checks · ${results.filter((r) => r.ok).length}/${results.length} passing`
                  : "↻ Re-run checks"}
            </span>
          </button>
          <p className="status-note">Measured live from your browser.</p>
        </div>
      )}
    </div>
  );
}
