"use client";

import { useEffect, useRef, useState } from "react";
import { avatarLines, person } from "@/data/content";

// Sections that make the guide speak, mapped to their line in avatarLines.
const SPEAKING_SECTIONS: Record<string, string> = { skills: "skills", projects: "work", contact: "contact" };

export default function AvatarGuide({ src }: { src?: string }) {
  const homeRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  const [line, setLine] = useState("hero");
  const [captionOpen, setCaptionOpen] = useState(false);
  const [docked, setDocked] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [woken, setWoken] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  // The guide only starts talking on its own once the visitor has interacted.
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
    const onChange = () => { reducedMotion.current = mq.matches; };
    mq.addEventListener("change", onChange);

    const wake = (e: Event) => {
      if (e instanceof KeyboardEvent && !["Enter", " ", "ArrowDown", "PageDown", "Tab"].includes(e.key)) return;
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      if (!mq.matches && !saveData) setWoken(true);
    };
    window.addEventListener("pointerdown", wake, { once: true });
    window.addEventListener("keydown", wake);
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("pointerdown", wake);
      window.removeEventListener("keydown", wake);
    };
  }, []);

  // Travel from the hero to the bottom-right corner as the hero scrolls away.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const home = homeRef.current;
      const guide = guideRef.current;
      const hero = document.getElementById("home");
      if (!home || !guide || !hero) return;

      const rect = home.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, scrollY / (0.72 * hero.offsetHeight)));
      const mobile = innerWidth < 768;
      const w = mobile ? 106 : 132;
      const h = mobile ? 154 : 188;
      const t = reducedMotion.current ? (progress > 0.95 ? 1 : 0) : progress;
      const mix = (from: number, to: number) => from + (to - from) * t;

      guide.style.position = "fixed";
      guide.style.left = `${mix(rect.left, innerWidth - w - 24)}px`;
      guide.style.top = `${mix(rect.top, innerHeight - h - 24)}px`;
      guide.style.width = `${mix(rect.width, w)}px`;
      guide.style.height = `${mix(rect.height, h)}px`;
      setDocked(progress > 0.92);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Say each section's line the first time it scrolls into view.
  useEffect(() => {
    if (!woken || dismissed || reducedMotion.current) return;
    const spoken = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting && !spoken.has(id)) {
            spoken.add(id);
            setLine(SPEAKING_SECTIONS[id]);
            setCaptionOpen(true);
          }
        }
      },
      { rootMargin: "-15% 0px -45% 0px", threshold: 0 },
    );
    Object.keys(SPEAKING_SECTIONS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [woken, dismissed]);

  const showImage = src && !imageFailed;

  return (
    <div ref={homeRef} className="avatar-home">
      <div
        ref={guideRef}
        className={`avatar-guide${docked ? " is-docked" : ""}${docked && dismissed ? " is-dismissed" : ""}`}
        aria-label={`${person.firstName}’s avatar guide`}
      >
        <div className="avatar-figure">
          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={`Full-body cartoon avatar of ${person.name}`}
              fetchPriority="high"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <AvatarPlaceholder />
          )}
        </div>
        {docked && (
          <button className="avatar-close" aria-label="Close avatar guide" onClick={() => setDismissed(true)}>
            ×
          </button>
        )}
        <div className="avatar-controls">
          <button aria-expanded={captionOpen} onClick={() => { setCaptionOpen((o) => !o); setWoken(true); }}>
            A quick hello <span aria-hidden="true">↗</span>
          </button>
        </div>
        {captionOpen && (
          <p key={line} className="avatar-caption" role="status">
            {avatarLines[line]}
          </p>
        )}
      </div>
    </div>
  );
}

// Stand-in figure until the real avatar artwork lands in public/avatar/.
function AvatarPlaceholder() {
  return (
    <div className="avatar-placeholder" aria-hidden="true">
      <svg viewBox="0 0 200 380" fill="none">
        <circle cx="100" cy="62" r="40" fill="#d8cdb8" />
        <path d="M44 150c0-26 25-44 56-44s56 18 56 44v110H44z" fill="#1d2a4a" />
        <path d="M58 260h36l-4 104H64zM106 260h36l-6 104h-26z" fill="#2a3858" />
        <ellipse cx="78" cy="368" rx="20" ry="8" fill="#ece6d8" />
        <ellipse cx="122" cy="368" rx="20" ry="8" fill="#ece6d8" />
        <text x="100" y="200" textAnchor="middle" fill="#f4f1e8" fontSize="11" fontFamily="Arial" letterSpacing="2">
          AVATAR
        </text>
      </svg>
    </div>
  );
}
