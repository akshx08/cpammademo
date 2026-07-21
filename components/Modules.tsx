"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { EASE_HOUSE, VIEW, fadeUp } from "@/lib/motion";
import { MODULES, type Module } from "@/lib/data";

/** photo that resolves from blueprint-wireframe state to full color */
function ResolveImage({ mod }: { mod: Module }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div ref={ref} className="brackets relative aspect-[4/3] overflow-hidden">
      {/* the photograph */}
      <Image
        src={mod.img}
        alt={mod.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-all duration-[1400ms] ease-house"
        style={{
          filter: inView
            ? "grayscale(0.1) contrast(1.08) brightness(1.05) saturate(1.15)"
            : "grayscale(1) contrast(1.6) brightness(0.5)",
          transform: inView ? "scale(1)" : "scale(1.06)",
        }}
      />
      {/* blueprint grid overlay that burns away */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-[1200ms] ease-house"
        style={{
          opacity: inView ? 0 : 1,
          backgroundImage:
            "linear-gradient(rgba(255,59,47,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(255,59,47,0.13) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* scan bar sweeps once on resolve */}
      {inView && (
        <div
          className="pointer-events-none absolute inset-x-0 h-16"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,59,47,0.22), transparent)",
            animation: "scan 1.1s cubic-bezier(0.4,0,0.2,1) 1 both",
          }}
        />
      )}
      {/* edge-only darkening + floor glow (house treatment) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(6,5,7,0.55), transparent 35%), radial-gradient(ellipse at 50% 100%, rgba(255,59,47,0.12), transparent 55%)",
        }}
      />
      <span className="absolute left-3 top-3 font-mono text-[9px] tracking-tag text-bone/70">
        {mod.tag} — FEED
      </span>
    </div>
  );
}

function ModulePanel({ mod, i }: { mod: Module; i: number }) {
  const flip = i % 2 === 1;
  return (
    <div
      className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
        flip ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div {...fadeUp(0.05)}>
        <ResolveImage mod={mod} />
      </motion.div>

      <div>
        <motion.p className="hud-tag" {...fadeUp(0)}>
          {mod.tag} — {mod.system}
        </motion.p>
        <motion.h3
          className="mt-3 font-display text-4xl leading-[0.95] text-bone md:text-6xl"
          {...fadeUp(0.08)}
        >
          {mod.name.toUpperCase()}
        </motion.h3>
        <motion.p
          className="mt-2 font-hud text-sm font-semibold tracking-hud text-blood"
          {...fadeUp(0.12)}
        >
          {mod.price}
        </motion.p>
        {mod.copy.map((c, ci) => (
          <motion.p
            key={ci}
            className="mt-4 max-w-lg font-body text-sm leading-relaxed text-steel"
            {...fadeUp(0.16 + ci * 0.06)}
          >
            {c}
          </motion.p>
        ))}
        <motion.ul className="mt-6 space-y-2" {...fadeUp(0.3)}>
          {mod.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2.5 font-mono text-[11px] leading-relaxed tracking-wide text-bone/80"
            >
              <span className="mt-[3px] text-blood">▸</span>
              {b}
            </li>
          ))}
        </motion.ul>
        <motion.a
          href="mailto:info@cpamma.com?subject=Free%20Trial%20Class"
          className="mt-7 inline-block border border-white/15 px-6 py-3 font-mono text-[10px] tracking-hud text-bone transition-colors duration-300 hover:border-blood hover:text-blood"
          {...fadeUp(0.36)}
        >
          SCHEDULE YOUR FREE TRIAL ▸
        </motion.a>
      </div>
    </div>
  );
}

export default function Modules() {
  return (
    <section
      id="modules"
      className="relative mx-auto w-full max-w-7xl px-4 py-28 md:px-8"
    >
      <motion.div
        className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: 0.85, ease: EASE_HOUSE }}
      >
        <div>
          <p className="hud-tag">TRAINING MODULES — 01/06</p>
          <h2 className="mt-3 font-display text-5xl leading-[0.9] text-bone md:text-7xl">
            SIX SYSTEMS.
            <br />
            ONE BUILD.
          </h2>
        </div>
        <p className="max-w-sm font-body text-sm leading-relaxed text-steel">
          Every program taught by a specialist — the only school in Central PA
          with certified instructors in Muay Thai, BJJ, Boxing, Judo, Jeet Kune
          Do, and Filipino Martial Arts.
        </p>
      </motion.div>

      <div className="space-y-28 md:space-y-36">
        {MODULES.map((m, i) => (
          <ModulePanel key={m.id} mod={m} i={i} />
        ))}
      </div>
    </section>
  );
}
