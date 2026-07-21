"use client";

import { useEffect, useRef } from "react";

/**
 * Hand-written rAF smooth scroll — house engine, no library.
 * Content rides in a fixed wrapper translated by a lerped scroll value
 * (lerp 0.09). Native scroll drives it, so IntersectionObserver-based
 * reveals keep working. Re-evaluates on resize: native scroll under
 * 768px or reduced-motion, lerped transform above.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const forceNative = new URLSearchParams(window.location.search).has(
      "native"
    );
    if (reduced || forceNative) return; // native scroll, full stop

    let enabled = false;
    let raf = 0;
    let current = 0;
    let height = 0;
    let ro: ResizeObserver | null = null;

    const setHeight = () => {
      const h = el.scrollHeight;
      if (h !== height) {
        height = h;
        document.body.style.height = `${h}px`;
      }
    };

    let lastT = 0;
    const loop = (t: number) => {
      const target = window.scrollY;
      // long frame gap (tab hidden / heavy throttle) → snap, no ghost catch-up
      if (t - lastT > 250) current = target;
      lastT = t;
      current += (target - current) * 0.09;
      if (Math.abs(target - current) < 0.05) current = target;
      el.style.transform = `translate3d(0, ${-current}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const enable = () => {
      if (enabled) return;
      enabled = true;
      // taking the content out of flow collapses the doc for one layout pass,
      // which clamps scrollY to 0 — save and restore around the swap
      const saved = window.scrollY;
      el.style.position = "fixed";
      el.style.top = "0";
      el.style.left = "0";
      el.style.width = "100%";
      el.style.willChange = "transform";
      ro = new ResizeObserver(setHeight);
      ro.observe(el);
      setHeight();
      window.scrollTo(0, saved);
      current = saved;
      el.style.transform = `translate3d(0, ${-saved}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const disable = () => {
      if (!enabled) return;
      enabled = false;
      cancelAnimationFrame(raf);
      ro?.disconnect();
      ro = null;
      height = 0;
      document.body.style.height = "";
      el.style.position = "";
      el.style.top = "";
      el.style.left = "";
      el.style.width = "";
      el.style.transform = "";
      el.style.willChange = "";
    };

    const evaluate = () => {
      if (window.innerWidth < 768) disable();
      else enable();
    };

    evaluate();
    window.addEventListener("resize", evaluate);

    return () => {
      window.removeEventListener("resize", evaluate);
      disable();
    };
  }, []);

  return <div ref={contentRef}>{children}</div>;
}
