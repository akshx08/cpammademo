"use client";

import { useCallback, useEffect, useState } from "react";
import { useEtClock } from "@/lib/useNextClass";

const LINKS = [
  { id: "system", label: "SYSTEM" },
  { id: "modules", label: "MODULES" },
  { id: "schedule", label: "SCHEDULE" },
  { id: "lineage", label: "LINEAGE" },
  { id: "proof", label: "PROOF" },
  { id: "access", label: "ACCESS" },
];

export default function Nav() {
  const clock = useEtClock();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({ top, behavior: "auto" }); // lerp engine supplies the smoothing
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-house ${
        scrolled ? "bg-void/85 backdrop-saturate-150" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 md:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0 })}
          className="flex items-center gap-3"
          aria-label="Back to top"
        >
          <span className="flex h-7 w-7 items-center justify-center border border-blood/60">
            <span className="font-display text-sm leading-none text-blood">
              C
            </span>
          </span>
          <span className="font-mono text-[11px] tracking-tag text-bone">
            CPAMMA
          </span>
        </button>

        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => jump(l.id)}
              className="font-mono text-[10px] tracking-hud text-steel transition-colors duration-300 hover:text-blood"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 font-mono text-[10px] tracking-hud text-steel md:flex">
            <span className="live-dot" />
            STATE COLLEGE {clock} ET
          </span>
          <a
            href="mailto:info@cpamma.com?subject=Free%20Trial%20Class"
            className="border border-blood bg-blood/10 px-3 py-1.5 font-mono text-[10px] tracking-hud text-blood transition-colors duration-300 hover:bg-blood hover:text-void"
          >
            FREE TRIAL
          </a>
        </div>
      </div>
    </header>
  );
}
