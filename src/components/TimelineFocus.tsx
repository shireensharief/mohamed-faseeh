"use client";

import { useEffect } from "react";

// Marks the experience role that sits in the middle of the screen as current:
// its timeline dot pulses and its card lifts (styles in globals.css).
export default function TimelineFocus() {
  useEffect(() => {
    const items = [...document.querySelectorAll<HTMLElement>(".timeline-item")];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            items.forEach((item) => item.classList.toggle("is-current", item === entry.target));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      items.forEach((item) => item.classList.remove("is-current"));
    };
  }, []);
  return null;
}
