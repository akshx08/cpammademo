"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { useNextClass } from "@/lib/useNextClass";

/** landing teaser for the timetable — live next class + the headline number */
export default function ScheduleTeaser() {
  const next = useNextClass();

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-28 md:px-8">
      <div className="brackets grid gap-10 border border-white/[0.08] bg-panel/50 px-8 py-12 md:grid-cols-[auto_1fr_auto] md:items-center md:px-12">
        <motion.div {...fadeUp(0)}>
          <p className="hud-tag">THE TIMETABLE</p>
          <p className="mt-2 font-display text-7xl leading-none text-bone md:text-8xl">
            70<span className="text-blood">+</span>
          </p>
          <p className="mt-1 font-mono text-[10px] tracking-hud text-steel">
            TRAINING HOURS / WEEK · 7 DAYS
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <p className="max-w-md font-body text-sm leading-relaxed text-steel">
            Early morning, lunch, evening, night, and late night. Any rank can
            attend any time slot inside their program — the grid is the whole
            machine.
          </p>
          {next && (
            <div className="mt-4 flex items-center gap-2.5 border border-white/10 bg-void/60 px-3 py-2.5">
              <span className="live-dot" />
              <p className="font-mono text-[9.5px] tracking-hud text-steel">
                NEXT — <span className="text-bone">{next.item.name}</span> ·{" "}
                <span className="text-blood">
                  {next.dayLabel} {next.clock}
                </span>
              </p>
            </div>
          )}
        </motion.div>

        <motion.div {...fadeUp(0.2)}>
          <Link
            href="/schedule"
            className="inline-block border border-blood px-8 py-4 font-mono text-[10px] tracking-hud text-blood transition-colors duration-300 hover:bg-blood hover:text-void"
          >
            OPEN THE FULL GRID ▸
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
