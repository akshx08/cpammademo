"use client";

import { motion } from "framer-motion";
import { EASE_HOUSE, VIEW, fadeUp, cardDelay } from "@/lib/motion";
import { REVIEWS, PRO_QUOTE, ABOUT_FACTS } from "@/lib/data";

export default function Proof() {
  return (
    <section
      id="proof"
      className="relative mx-auto w-full max-w-7xl px-4 py-28 md:px-8"
    >
      {/* hard numbers strip */}
      <div className="mb-24 grid grid-cols-2 gap-px border border-white/[0.07] bg-white/[0.07] md:grid-cols-4">
        {ABOUT_FACTS.map((f, i) => (
          <motion.div
            key={f.k}
            className="bg-void px-5 py-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{
              duration: 0.8,
              ease: EASE_HOUSE,
              delay: cardDelay(i % 4),
            }}
          >
            <p className="font-hud text-4xl font-bold text-bone md:text-5xl">
              {f.v}
              <span className="text-blood">.</span>
            </p>
            <p className="mt-1.5 font-mono text-[9px] tracking-hud text-steel">
              {f.k}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div className="mb-4 text-center" {...fadeUp(0)}>
        <p className="hud-tag">FIELD REPORTS — VERIFIED GOOGLE REVIEWS</p>
        <h2 className="mt-3 font-display text-6xl leading-[0.9] text-bone md:text-8xl">
          500+ <span className="text-blood">★</span>
        </h2>
        <p className="mt-2 font-hud text-sm font-semibold tracking-[0.35em] text-steel">
          FIVE-STAR REVIEWS
        </p>
      </motion.div>

      {/* the pro citation */}
      <motion.blockquote
        className="brackets mx-auto mb-14 mt-12 max-w-2xl border border-blood/30 bg-panel/60 px-8 py-8 text-center"
        {...fadeUp(0.1)}
      >
        <p className="font-body text-base leading-relaxed text-bone md:text-lg">
          &ldquo;{PRO_QUOTE.quote}&rdquo;
        </p>
        <footer className="mt-4">
          <p className="font-hud text-sm font-semibold tracking-hud text-blood">
            {PRO_QUOTE.name.toUpperCase()}
          </p>
          <p className="mt-0.5 font-mono text-[9px] tracking-hud text-steel">
            {PRO_QUOTE.cred.toUpperCase()}
          </p>
        </footer>
      </motion.blockquote>

      <div className="columns-1 gap-3 md:columns-2 lg:columns-4">
        {REVIEWS.map((r, i) => (
          <motion.figure
            key={r.name + i}
            className="mb-3 break-inside-avoid border border-white/[0.07] bg-panel/50 px-5 py-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{
              duration: 0.8,
              ease: EASE_HOUSE,
              delay: cardDelay(i % 4),
            }}
          >
            <p className="font-mono text-[9px] tracking-widest text-blood">
              ★★★★★
            </p>
            <blockquote className="mt-3 font-body text-[13px] leading-relaxed text-bone/85">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 font-mono text-[9px] tracking-hud text-steel">
              — {r.name.toUpperCase()} · GOOGLE
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
