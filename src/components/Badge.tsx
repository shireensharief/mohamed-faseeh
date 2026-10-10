"use client";

import { useEffect, useRef, useState } from "react";
import type MatterNS from "matter-js";
import { about, person } from "@/data/content";
import CountUp from "./CountUp";

// Card geometry (px). The body hangs from the scene's top-centre on a short cord.
const CARD_W = 220;
const CARD_H = 285;
const REST_Y = 190; // body centre at rest; card top = 190 - 142.5 = 48 (matches CSS top)
const HALF = 142;

export default function Badge({ photo }: { photo?: string }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cordRef = useRef<SVGLineElement>(null);
  const dragApi = useRef<{ start(x: number, y: number): void; move(x: number, y: number): void; end(): void } | null>(null);
  const press = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const cardEl = bodyRef.current;
    if (!sceneEl || !cardEl) return;
    const scene: HTMLDivElement = sceneEl;
    const card: HTMLDivElement = cardEl;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let teardown = () => {};

    async function start() {
      if (reduced.matches) return;
      const Matter: typeof MatterNS = (await import("matter-js")).default;
      if (cancelled) return;
      const { Engine, Bodies, Body, Constraint, Composite } = Matter;

      const engine = Engine.create();
      engine.gravity.y = 0.75;
      const badge = Bodies.rectangle(0, REST_Y, CARD_W, CARD_H, { frictionAir: 0.07, restitution: 0.2 });
      const cord = Constraint.create({
        // A soft, elastic cord: it stretches a long way when pulled and bounces back.
        pointA: { x: 0, y: 0 }, bodyB: badge, pointB: { x: 0, y: -HALF }, length: 48, stiffness: 0.1, damping: 0.1,
      });
      Composite.add(engine.world, [badge, cord]);
      Body.setAngle(badge, -0.075); // hangs with a slight tilt

      let frame = 0;
      let idleFrames = 0;
      let last = 0; // timestamp of the previous frame
      let carry = 0; // simulation time owed but not yet stepped
      // Measured once (and on resize) so the render loop never forces a layout.
      let centerX = scene.clientWidth / 2;
      const onResize = () => { centerX = scene.clientWidth / 2; };
      window.addEventListener("resize", onResize);
      let visible = false;
      let dragging = false;
      let grab: MatterNS.Constraint | null = null;

      // Previous physics state, so frames between steps can be blended smoothly.
      let prev = { x: badge.position.x, y: badge.position.y, angle: badge.angle };

      const render = (alpha = 1) => {
        const x = prev.x + (badge.position.x - prev.x) * alpha;
        const y = prev.y + (badge.position.y - prev.y) * alpha;
        const angle = prev.angle + (badge.angle - prev.angle) * alpha;
        card.style.transform = `translate(${x}px, ${y - REST_Y}px) rotate(${angle}rad)`;
        const line = cordRef.current;
        if (line) {
          const cx = centerX;
          line.setAttribute("x1", String(cx));
          line.setAttribute("y1", "0");
          line.setAttribute("x2", String(cx + x + HALF * Math.sin(angle)));
          line.setAttribute("y2", String(y - HALF * Math.cos(angle)));
        }
      };

      // Step the physics in fixed 60 Hz slices of real elapsed time (the rate its
      // friction and springs are tuned for), and blend between steps when drawing,
      // so the swing runs at the same speed and stays fluid on 60 Hz and 120 Hz screens.
      const STEP = 1000 / 60;
      const tick = (now: number) => {
        frame = 0;
        const elapsed = last ? Math.min(now - last, 50) : STEP;
        last = now;
        carry += elapsed;
        while (carry >= STEP) {
          prev = { x: badge.position.x, y: badge.position.y, angle: badge.angle };
          Engine.update(engine, STEP);
          carry -= STEP;
        }
        render(carry / STEP);
        idleFrames++;
        const moving = Math.abs(badge.angularVelocity) > 1e-4 || badge.speed > 0.01;
        if (dragging || idleFrames < 180 || moving) frame = requestAnimationFrame(tick);
      };
      const wake = () => {
        if (frame || !visible || document.hidden) return;
        idleFrames = 0;
        last = 0;
        carry = 0;
        frame = requestAnimationFrame(tick);
      };
      const sleep = () => { cancelAnimationFrame(frame); frame = 0; };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          Body.setAngularVelocity(badge, 0.02); // a little swing on arrival
          wake();
        } else sleep();
      });
      io.observe(scene);
      const onVisibility = () => (document.hidden ? sleep() : wake());
      document.addEventListener("visibilitychange", onVisibility);

      const local = (clientX: number, clientY: number) => {
        const r = scene.getBoundingClientRect();
        return { x: clientX - r.left - r.width / 2, y: clientY - r.top };
      };
      dragApi.current = {
        start(cx, cy) {
          // Pull the card by its centre, on a soft spring, like the reference.
          grab = Constraint.create({ pointA: local(cx, cy), bodyB: badge, stiffness: 0.08, damping: 0.2, length: 0 });
          Composite.add(engine.world, grab);
          dragging = true;
          wake();
        },
        move(cx, cy) { if (grab) grab.pointA = local(cx, cy); },
        end() {
          if (grab) Composite.remove(engine.world, grab);
          grab = null;
          dragging = false;
          wake();
        },
      };

      teardown = () => {
        sleep();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("resize", onResize);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
        dragApi.current = null;
        card.style.transform = "";
      };
    }

    // Load the physics library only when the badge is about to be seen.
    const lazy = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { start(); lazy.disconnect(); }
    }, { rootMargin: "100px" });
    lazy.observe(scene);
    const onMotionPref = () => { teardown(); if (!reduced.matches) start(); };
    reduced.addEventListener("change", onMotionPref);
    return () => { cancelled = true; lazy.disconnect(); teardown(); reduced.removeEventListener("change", onMotionPref); };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    press.current = { x: e.clientX, y: e.clientY, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragApi.current?.start(e.clientX, e.clientY);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const p = press.current;
    if (!p) return;
    if (Math.hypot(e.clientX - p.x, e.clientY - p.y) > 5) p.moved = true;
    dragApi.current?.move(e.clientX, e.clientY);
  };
  const onPointerUp = () => {
    dragApi.current?.end();
    if (press.current && !press.current.moved) setFlipped((f) => !f);
    press.current = null;
  };

  const { badge } = about;
  return (
    <div className="badge-column">
      <div className="badge-scene" ref={sceneRef}>
        <svg className="badge-cord" aria-hidden="true">
          <line ref={cordRef} x1="160" y1="0" x2="160" y2="48" stroke="currentColor" strokeWidth="3" />
        </svg>
        <span className="lanyard" aria-hidden="true">{badge.lanyard}</span>
        <div
          className="badge-body"
          ref={bodyRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <button
            className={`badge-flip${flipped ? " is-flipped" : ""}`}
            aria-label={flipped ? "Flip to ID card" : "Flip to career stats"}
            aria-pressed={flipped}
            onClick={(e) => { if (e.detail === 0) setFlipped((f) => !f); /* keyboard only */ }}
          >
            <span className="badge-face badge-front">
              <span className="badge-top">{badge.org} <small>{badge.unit}</small></span>
              <span className="badge-photo">
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo} alt="" draggable={false} />
                ) : (
                  person.monogram
                )}
              </span>
              <strong>{person.name}</strong>
              <span className="badge-role">{badge.title}</span>
              <span className="badge-footer">
                <span className="barcode" />
                <small>MY PORTFOLIO ID</small>
              </span>
            </span>
            <span className="badge-face badge-back">
              <span className="eyebrow">THE SHORT VERSION</span>
              <strong>Made of{" "}<br />experience.</strong>
              <span className="badge-stats">
                {badge.stats.map((s) => (
                  <span key={s.label}>
                    <b><CountUp value={s.value} />{s.suffix}</b>
                    <small>{s.label}</small>
                  </span>
                ))}
              </span>
              <span className="badge-line">{badge.backLine}</span>
              <small>{badge.backNote}</small>
            </span>
          </button>
        </div>
      </div>
      <p className="badge-hint"><span aria-hidden="true">↔</span> Drag a little. Click to flip.</p>
    </div>
  );
}
