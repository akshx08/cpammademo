"use client";

import { useEffect, useRef } from "react";

/**
 * Atmosphere layer — 3-tier parallax ember field on canvas + red aurora
 * glows. Screen-blended, transform/opacity only, capped on mobile,
 * gated off under reduced-motion. Sits behind everything (z-0), above void.
 */
export default function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 60 : 150;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    let mx = 0;
    let my = 0;
    let running = true;

    type P = {
      x: number;
      y: number;
      r: number;
      tier: number; // 0 far, 1 mid, 2 near
      v: number;
      red: boolean;
      tw: number; // twinkle phase
    };
    let parts: P[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      parts = Array.from({ length: COUNT }, () => {
        const tier = Math.random() < 0.5 ? 0 : Math.random() < 0.7 ? 1 : 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: tier === 0 ? 0.6 : tier === 1 ? 1.0 : 1.6,
          tier,
          v: (tier + 1) * 0.035,
          red: Math.random() < 0.18,
          tw: Math.random() * Math.PI * 2,
        };
      });
    };

    resize();
    seed();

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / w - 0.5) * 2;
      mouseY = (e.clientY / h - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", () => {
      resize();
      seed();
    });

    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVis);

    let t = 0;
    const draw = () => {
      if (!running) return;
      t += 0.016;
      mx += (mouseX - mx) * 0.04;
      my += (mouseY - my) * 0.04;
      const scroll = window.scrollY;
      ctx.clearRect(0, 0, w, h);

      for (const p of parts) {
        const par = (p.tier + 1) * 0.045; // parallax factor per tier
        const px = p.x - mx * (p.tier + 1) * 9;
        let py = (p.y - t * p.v * 22 - scroll * par) % h;
        if (py < 0) py += h;
        const twinkle = 0.55 + Math.sin(t * 1.4 + p.tw) * 0.35;
        ctx.globalAlpha =
          twinkle * (p.tier === 0 ? 0.34 : p.tier === 1 ? 0.5 : 0.7);
        ctx.fillStyle = p.red ? "#FF3B2F" : "#C9CDD4";
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      // one static frame
      t = 1;
      const scroll = 0;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        ctx.globalAlpha = p.tier === 0 ? 0.3 : 0.5;
        ctx.fillStyle = p.red ? "#FF3B2F" : "#C9CDD4";
        ctx.beginPath();
        ctx.arc(p.x, (p.y - scroll) % h, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {/* ember field */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* red aurora — screen blended, only adds light */}
      <div
        className="absolute -left-1/4 top-[-20%] h-[70vh] w-[70vw] rounded-full opacity-[0.13] mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse at center, #FF3B2F 0%, transparent 62%)",
        }}
      />
      <div
        className="absolute -right-1/4 bottom-[-30%] h-[80vh] w-[70vw] rounded-full opacity-[0.09] mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse at center, #B3221A 0%, transparent 60%)",
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
