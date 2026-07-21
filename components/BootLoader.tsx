"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_DRAWER } from "@/lib/motion";

const LINES = [
  "CPAMMA.SYS v26.07 — CENTRAL PA MIXED MARTIAL ARTS",
  "LOCATION: STATE COLLEGE, PA · 40.79°N 77.86°W",
  "LOADING MODULES: STRIKING / GRAPPLING / WEAPONS",
  "TRAINING WINDOW: 70+ HRS · 7 DAYS / WK",
  "SYSTEM READY.",
];

/** Boot sequence — mono terminal lines + red progress bar. Runs once per session. */
export default function BootLoader() {
  const [show, setShow] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("cpamma-booted")) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      sessionStorage.setItem("cpamma-booted", "1");
      return;
    }
    setShow(true);
    document.documentElement.style.overflow = "hidden";

    const lineTimer = setInterval(() => {
      setLineCount((c) => {
        if (c >= LINES.length) {
          clearInterval(lineTimer);
          return c;
        }
        return c + 1;
      });
    }, 190);

    const start = performance.now();
    const DURATION = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setShow(false);
          sessionStorage.setItem("cpamma-booted", "1");
          document.documentElement.style.overflow = "";
        }, 240);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      clearInterval(lineTimer);
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-end bg-void px-6 pb-10 md:px-12 md:pb-14"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: EASE_DRAWER }}
          aria-hidden
        >
          <div className="mb-6 space-y-1.5">
            {LINES.slice(0, lineCount).map((l, i) => (
              <p
                key={l}
                className={`font-mono text-[10px] uppercase tracking-hud md:text-xs ${
                  i === LINES.length - 1 ? "text-blood" : "text-steel"
                }`}
              >
                <span className="mr-2 text-blood">▸</span>
                {l}
              </p>
            ))}
          </div>
          <div className="h-px w-full bg-white/10">
            <div
              className="h-px bg-blood"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-hud text-steel">
            <span>BOOTING FIGHTER SYSTEM</span>
            <span className="text-blood">{Math.round(progress * 100)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
