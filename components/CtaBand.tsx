"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

/** closing conversion band used on every interior page */
export default function CtaBand({
  headline = "STEP ON THE",
  accent = "MATS.",
  sub = "Your first class is on us — up to one month free. Brand new people start every day. You will fit right in.",
}: {
  headline?: string;
  accent?: string;
  sub?: string;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 text-center md:px-8">
      <motion.p className="hud-tag" {...fadeUp(0)}>
        FINAL TRANSMISSION
      </motion.p>
      <motion.h2
        className="mt-4 font-display text-6xl leading-[0.85] text-bone md:text-8xl"
        {...fadeUp(0.08)}
      >
        {headline} <span className="text-blood">{accent}</span>
      </motion.h2>
      <motion.p
        className="mx-auto mt-5 max-w-md font-body text-sm leading-relaxed text-steel"
        {...fadeUp(0.16)}
      >
        {sub}
      </motion.p>
      <motion.div {...fadeUp(0.24)}>
        <Link
          href="/contact"
          className="mt-8 inline-block border border-blood bg-blood px-12 py-4 font-mono text-[11px] tracking-hud text-void transition-colors duration-300 hover:bg-transparent hover:text-blood"
        >
          GET YOUR PASS ▸
        </Link>
      </motion.div>
    </section>
  );
}
