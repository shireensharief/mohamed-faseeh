"use client";

import { useEffect } from "react";

// Page-wide motion: smooth scrolling, reveal-on-scroll, the timeline line,
// the pinned sideways project rail, the scroll-progress bar and the hero name drift.
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      const max = root.scrollHeight - innerHeight;
      root.style.setProperty("--scroll-progress", String(max > 0 ? scrollY / max : 0));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let lenis: InstanceType<typeof Lenis> | undefined;
        const raf = (time: number) => lenis?.raf(time * 1000);
        if (matchMedia("(pointer: fine)").matches) {
          lenis = new Lenis({ duration: 1.05, anchors: true });
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add(raf);
        }

        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(el, { y: 24 }, {
            y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          });
        });

        gsap.fromTo(".timeline-draw", { scaleY: 0 }, {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 75%", scrub: true },
        });

        return () => {
          gsap.ticker.remove(raf);
          lenis?.destroy();
        };
      });

      // Desktop: pin the projects and slide the rail sideways as you scroll down.
      mm.add("(min-width: 1100px) and (prefers-reduced-motion: no-preference)", () => {
        const rail = document.querySelector<HTMLElement>(".work-rail");
        const win = document.querySelector<HTMLElement>(".work-window");
        if (!rail || !win) return;
        win.classList.add("is-pinned");
        const distance = () => Math.max(0, rail.scrollWidth - win.clientWidth);
        const tween = gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".work-stage",
            start: "top 95px",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        // Keyboard users tabbing into a card get scrolled to it.
        const onFocus = (e: FocusEvent) => {
          const card = (e.target as HTMLElement).closest<HTMLElement>(".project-card");
          const st = tween.scrollTrigger;
          if (!card || !st) return;
          const t = Math.min(1, card.offsetLeft / (distance() || 1));
          window.scrollTo({ top: st.start + (st.end - st.start) * t, behavior: "instant" });
        };
        rail.addEventListener("focusin", onFocus);
        return () => {
          rail.removeEventListener("focusin", onFocus);
          win.classList.remove("is-pinned");
        };
      });

      // The big ghost name drifts a few pixels with the mouse.
      const ghost = document.querySelector(".hero-ghost");
      const hero = document.getElementById("home");
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.to(ghost, {
          x: (e.clientX / innerWidth - 0.5) * 14,
          y: (e.clientY / innerHeight - 0.5) * 8,
          duration: 0.8,
          overwrite: true,
        });
      };
      hero?.addEventListener("pointermove", onMove);

      // Fonts and images change heights; re-measure the pinned section after they settle.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });

      cleanup = () => {
        mm.revert();
        hero?.removeEventListener("pointermove", onMove);
      };
    })();

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      cleanup();
    };
  }, []);

  return null;
}
