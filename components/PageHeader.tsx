"use client";

import { motion } from "framer-motion";
import { EASE_HOUSE } from "@/lib/motion";

/** standard interior-page opening block */
export default function PageHeader({
  tag,
  title,
  accent,
  sub,
}: {
  tag: string;
  title: string;
  accent?: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-32 md:px-8 md:pt-40">
      <motion.p
        className="hud-tag"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_HOUSE }}
      >
        {tag}
      </motion.p>
      <motion.h1
        className="mt-3 font-display text-5xl leading-[0.9] text-bone md:text-7xl"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: EASE_HOUSE, delay: 0.08 }}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className="text-blood">{accent}</span>
          </>
        )}
      </motion.h1>
      {sub && (
        <motion.p
          className="mt-5 max-w-xl font-body text-sm leading-relaxed text-steel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE_HOUSE, delay: 0.16 }}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
