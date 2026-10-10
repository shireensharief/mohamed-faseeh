"use client";

import { useEffect, useRef, useState } from "react";

// Counts from 0 to `value` once, the first time it scrolls into view.
export default function CountUp({ value, duration = 1400 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(0);
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 2); // power2.out
        setShown(Math.round(value * eased));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { rootMargin: "0px 0px -5% 0px" });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, duration]);

  return <span ref={ref}>{shown}</span>;
}
