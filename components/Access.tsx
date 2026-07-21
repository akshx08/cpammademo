"use client";

import { motion } from "framer-motion";
import { EASE_HOUSE, VIEW, fadeUp, cardDelay } from "@/lib/motion";
import { RATES, RATE_FOOTNOTES, GYM } from "@/lib/data";

export default function Access() {
  return (
    <section id="access" className="relative w-full">
      <div className="mx-auto max-w-7xl px-4 py-28 md:px-8">
        <motion.div className="mb-14 text-center" {...fadeUp(0)}>
          <p className="hud-tag">ACCESS PROTOCOLS — LOCK YOUR RATE</p>
          <h2 className="mt-3 font-display text-5xl leading-[0.9] text-bone md:text-7xl">
            <span className="text-blood">$0</span> TO START.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-steel">
            No startup fees. No cancellation fees. No long-term contracts. The
            lowest rates in Central PA — locked in for as long as you stay.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {RATES.map((r, i) => (
            <motion.div
              key={r.id}
              className={`relative flex flex-col px-7 py-8 ${
                r.featured
                  ? "brackets border border-blood/60 bg-panel"
                  : "border border-white/[0.08] bg-panel/50"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEW}
              transition={{
                duration: 0.85,
                ease: EASE_HOUSE,
                delay: cardDelay(i),
              }}
            >
              {r.featured && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-blood px-3 py-0.5 font-mono text-[8px] tracking-tag text-void">
                  MOST LOCKED-IN
                </span>
              )}
              <p className="font-mono text-[10px] tracking-tag text-steel">
                {r.tag}
              </p>
              <p className="mt-2 font-hud text-lg font-semibold tracking-hud text-bone">
                {r.name}
              </p>
              <p className="mt-4 font-display text-6xl text-bone">
                ${r.price}
                <span className="font-hud text-lg text-steel">{r.per}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {r.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 font-mono text-[10.5px] leading-relaxed text-bone/80"
                  >
                    <span className="mt-[2px] text-blood">▸</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${GYM.email}?subject=Free%20Trial%20Class%20—%20${encodeURIComponent(r.name)}`}
                className={`mt-8 block py-3 text-center font-mono text-[10px] tracking-hud transition-colors duration-300 ${
                  r.featured
                    ? "bg-blood text-void hover:bg-transparent hover:text-blood hover:outline hover:outline-1 hover:outline-blood"
                    : "border border-white/15 text-bone hover:border-blood hover:text-blood"
                }`}
              >
                CLAIM THIS RATE ▸
              </a>
            </motion.div>
          ))}
        </div>

        <motion.ul
          className="mx-auto mt-8 max-w-3xl space-y-1.5 text-center"
          {...fadeUp(0.2)}
        >
          {RATE_FOOTNOTES.map((f) => (
            <li key={f} className="font-mono text-[9px] tracking-wide text-steel">
              {f}
            </li>
          ))}
        </motion.ul>

        {/* PSU band */}
        <motion.div
          className="brackets mt-20 grid gap-6 border border-white/[0.08] bg-panel/60 px-8 py-10 md:grid-cols-[1fr_auto] md:items-center"
          {...fadeUp(0.1)}
        >
          <div>
            <p className="hud-tag">PENN STATE PROTOCOL</p>
            <h3 className="mt-2 font-display text-3xl leading-[0.95] text-bone md:text-5xl">
              400+ PSU STUDENTS ALREADY TRAIN HERE.
            </h3>
            <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-steel">
              On-campus at 1445 West College Ave, behind the IST Building —
              walk from class, CATA bus stop out front. Home of Martial
              University: MMA Club, BJJ Club &amp; Muay Thai Club, and main
              sponsor of Penn State Boxing. As little as $1 per class with a
              PSU ID.
            </p>
          </div>
          <a
            href={`mailto:${GYM.email}?subject=PSU%20Student%20Special`}
            className="justify-self-start border border-blood px-8 py-4 font-mono text-[10px] tracking-hud text-blood transition-colors duration-300 hover:bg-blood hover:text-void md:justify-self-end"
          >
            PSU STUDENTS — CLICK HERE
          </a>
        </motion.div>

        {/* final CTA */}
        <motion.div className="mt-28 text-center" {...fadeUp(0)}>
          <p className="hud-tag">FINAL TRANSMISSION</p>
          <h3 className="mt-4 font-display text-[13vw] leading-[0.85] text-bone md:text-9xl">
            STEP ON
            <br />
            THE <span className="text-blood">MATS.</span>
          </h3>
          <p className="mx-auto mt-5 max-w-md font-body text-sm leading-relaxed text-steel">
            Your first class is on us — up to one month free. Brand new people
            start every day. You will fit right in.
          </p>
          <a
            href={`mailto:${GYM.email}?subject=Free%20Trial%20Class`}
            className="mt-8 inline-block border border-blood bg-blood px-12 py-4 font-mono text-[11px] tracking-hud text-void transition-colors duration-300 hover:bg-transparent hover:text-blood"
          >
            GET YOUR PASS ▸
          </a>
        </motion.div>
      </div>

      {/* footer */}
      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
          <div>
            <p className="font-display text-2xl text-bone">
              CPAMMA<span className="text-blood">.</span>
            </p>
            <p className="mt-2 font-mono text-[10px] leading-relaxed tracking-hud text-steel">
              {GYM.tagline}
            </p>
            <p className="mt-4 font-body text-xs leading-relaxed text-steel">
              {GYM.address}
              <br />
              {GYM.addressNote}
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-wide text-bone/80">
              {GYM.phone} ·{" "}
              <a href={`mailto:${GYM.email}`} className="text-blood">
                {GYM.email}
              </a>
            </p>
            <div className="mt-3 flex gap-4">
              <a
                href={GYM.instagram}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] tracking-hud text-steel transition-colors hover:text-blood"
              >
                INSTAGRAM ↗
              </a>
              <a
                href={GYM.facebook}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] tracking-hud text-steel transition-colors hover:text-blood"
              >
                FACEBOOK ↗
              </a>
            </div>
          </div>

          <div>
            <p className="hud-tag mb-4">GYM HOURS</p>
            <ul className="space-y-1.5">
              {GYM.hours.map((h) => (
                <li
                  key={h.day}
                  className="flex justify-between border-b border-white/[0.05] pb-1.5 font-mono text-[10px] tracking-wide"
                >
                  <span className="text-bone/80">{h.day}</span>
                  <span className="text-steel">{h.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[8.5px] leading-relaxed text-steel/70">
              DOOR MAY BE LOCKED FOR SELECT CLASSES — FIRST-TIME VISITORS
              ALWAYS EMAIL FIRST.
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="hud-tag mb-4">SYSTEM STATUS</p>
              <ul className="space-y-1.5 font-mono text-[10px] tracking-wide text-steel">
                <li>
                  <span className="text-blood">▸</span> LOCATION LOCK —{" "}
                  {GYM.coords}
                </li>
                <li>
                  <span className="text-blood">▸</span> 70+ HRS/WK · 7 DAYS
                </li>
                <li>
                  <span className="text-blood">▸</span> ADOPT-A-COP AFFILIATE —
                  LEO TRAIN FREE
                </li>
                <li>
                  <span className="text-blood">▸</span> ONLINE UNIVERSITY
                  INCLUDED
                </li>
              </ul>
            </div>
            <p className="mt-8 font-mono text-[8.5px] tracking-hud text-steel/60">
              CPAMMA.SYS — CONCEPT REBUILD · DEMO V1 · 2026
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
