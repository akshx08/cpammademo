"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_HOUSE, VIEW, fadeUp, cardDelay } from "@/lib/motion";
import { LINEAGE, INSTRUCTORS, FIGHTERS } from "@/lib/data";

/** three arts converge on one room — constellation graph */
function Constellation() {
  const roots = [
    { ...LINEAGE.roots[0], x: 16, y: 10 },
    { ...LINEAGE.roots[1], x: 50, y: 6 },
    { ...LINEAGE.roots[2], x: 84, y: 10 },
  ];
  const center = { x: 50, y: 52 };

  return (
    <div className="relative mx-auto h-[360px] w-full max-w-3xl md:h-[420px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {roots.map((r, i) => (
          <motion.line
            key={r.id}
            x1={r.x}
            y1={r.y + 8}
            x2={center.x}
            y2={center.y - 6}
            stroke="rgba(255,59,47,0.4)"
            strokeWidth={0.3}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={VIEW}
            transition={{ duration: 1.05, ease: EASE_HOUSE, delay: 0.2 + i * 0.15 }}
          />
        ))}
        <motion.line
          x1={center.x}
          y1={center.y + 7}
          x2={center.x}
          y2={86}
          stroke="rgba(255,59,47,0.4)"
          strokeWidth={0.3}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={VIEW}
          transition={{ duration: 0.9, ease: EASE_HOUSE, delay: 0.75 }}
        />
      </svg>

      {roots.map((r, i) => (
        <div
          key={r.id}
          className="absolute w-40 -translate-x-1/2 md:w-48"
          style={{ left: `${r.x}%`, top: `${r.y}%` }}
        >
          <motion.div
            className="border border-white/10 bg-panel/80 px-3 py-2.5 text-center"
            {...fadeUp(0.1 + i * 0.12, 18)}
          >
            <p className="font-mono text-[8px] tracking-tag text-blood">
              {r.art}
            </p>
            <p className="mt-1 font-hud text-xs font-semibold tracking-wide text-bone md:text-sm">
              {r.name}
            </p>
            <p className="mt-0.5 font-mono text-[8px] leading-relaxed text-steel">
              {r.org}
            </p>
          </motion.div>
        </div>
      ))}

      <div
        className="absolute left-1/2 w-56 -translate-x-1/2 -translate-y-1/2"
        style={{ top: `${center.y}%` }}
      >
        <motion.div
          className="brackets border border-blood/50 bg-void px-4 py-3 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEW}
          transition={{ duration: 0.85, ease: EASE_HOUSE, delay: 0.6 }}
        >
          <p className="font-mono text-[8px] tracking-tag text-steel">
            ALL THREE LINES CONVERGE
          </p>
          <p className="mt-1 font-hud text-sm font-bold tracking-wide text-blood">
            {LINEAGE.center.name}
          </p>
          <p className="mt-0.5 font-mono text-[9px] text-bone/80">
            {LINEAGE.center.sub}
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-1/2 w-full max-w-xl -translate-x-1/2"
        {...fadeUp(0.85, 16)}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
          {LINEAGE.leaves.map((l) => (
            <span
              key={l}
              className="font-mono text-[8.5px] tracking-wide text-steel"
            >
              <span className="text-blood">◆ </span>
              {l}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Lineage() {
  return (
    <section
      id="lineage"
      className="relative mx-auto w-full max-w-7xl px-4 py-28 md:px-8"
    >
      <motion.div className="mb-14 text-center" {...fadeUp(0)}>
        <p className="hud-tag">BLOODLINE VERIFICATION</p>
        <h2 className="mt-3 font-display text-5xl leading-[0.9] text-bone md:text-7xl">
          THE <span className="text-blood">LINEAGE</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-steel">
          Rank here is not self-declared. Every arm band and belt in this
          building traces to a named source — Ajarn Chai Sirisute, Erik
          Paulson, and the Inosanto line.
        </p>
      </motion.div>

      <Constellation />

      {/* staff grid */}
      <motion.div className="mb-8 mt-24" {...fadeUp(0)}>
        <p className="hud-tag">PERSONNEL FILES — 15+ CERTIFIED · 100+ FIGHTS</p>
      </motion.div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {INSTRUCTORS.map((p, i) => (
          <motion.div
            key={p.name}
            className="group border border-white/[0.07] bg-panel/60 transition-colors duration-500 ease-house hover:border-blood/50"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{
              duration: 0.8,
              ease: EASE_HOUSE,
              delay: cardDelay(i % 4),
            }}
          >
            {p.img && (
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover grayscale transition-all duration-700 ease-house group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
                <span className="absolute right-2 top-2 font-mono text-[8px] tracking-tag text-bone/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            )}
            <div className="px-3 py-3">
              <p className="font-hud text-sm font-semibold tracking-wide text-bone">
                {p.nick ? (
                  <>
                    {p.name.split(" ")[0]}{" "}
                    <span className="text-blood">&ldquo;{p.nick}&rdquo;</span>{" "}
                    {p.name.split(" ").slice(1).join(" ")}
                  </>
                ) : (
                  p.name
                )}
              </p>
              <p className="mt-0.5 font-mono text-[8.5px] tracking-hud text-blood">
                {p.role.toUpperCase()}
              </p>
              <ul className="mt-2 space-y-0.5">
                {p.creds.map((c) => (
                  <li
                    key={c}
                    className="font-mono text-[8.5px] leading-relaxed text-steel"
                  >
                    ▸ {c}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* fight team marquee */}
      <motion.div className="mt-24" {...fadeUp(0)}>
        <p className="hud-tag mb-6">
          FIGHT TEAM LEDGER — PAST &amp; PRESENT · SPARRING 6 DAYS / WK
        </p>
      </motion.div>
      <div className="marquee-mask relative overflow-hidden border-y border-white/[0.07] py-5">
        <div className="marquee flex w-max gap-3">
          {[...FIGHTERS, ...FIGHTERS].map((f, i) => (
            <div
              key={i}
              className="flex w-64 shrink-0 items-center gap-3 border border-white/[0.07] bg-panel/60 px-4 py-3"
            >
              {f.img && (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden">
                  <Image
                    src={f.img}
                    alt={f.name}
                    fill
                    sizes="48px"
                    className="object-cover grayscale"
                  />
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate font-hud text-xs font-semibold tracking-wide text-bone">
                  {f.name}
                </p>
                <p className="font-mono text-[8.5px] text-steel">{f.disc}</p>
                <p className="font-mono text-[10px] font-bold text-blood">
                  {f.record}
                  {f.note && (
                    <span className="font-normal text-steel"> · {f.note}</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
