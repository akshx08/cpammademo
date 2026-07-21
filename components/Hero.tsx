"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_HOUSE } from "@/lib/motion";
import { HERO_STATS } from "@/lib/data";
import { useNextClass } from "@/lib/useNextClass";

const HeroCage = dynamic(() => import("@/components/HeroCage"), {
  ssr: false,
});

/** floating HUD chip with its own slow drift */
function FloatChip({
  k,
  v,
  className,
  delay,
  drift,
}: {
  k: string;
  v: string;
  className: string;
  delay: number;
  drift: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute hidden lg:block ${className}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.05, ease: EASE_HOUSE, delay }}
    >
      <motion.div
        animate={{ y: [0, drift, 0] }}
        transition={{
          duration: 6 + drift,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="brackets bg-void/70 px-4 py-3"
      >
        <p className="font-mono text-[9px] tracking-tag text-steel">{k}</p>
        <p className="mt-1 font-hud text-lg font-semibold tracking-wide text-bone">
          {v}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const next = useNextClass();

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      <HeroCage />

      {/* darkening under type — edge-only, product glow stays */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 62%, transparent 30%, rgba(6,5,7,0.72) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-24 text-center md:px-8">
        <motion.p
          className="hud-tag"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_HOUSE, delay: 0.1 }}
        >
          CENTRAL PA MIXED MARTIAL ARTS — EST. STATE COLLEGE, PA
        </motion.p>

        <h1 className="mt-4 select-none font-display leading-[0.85] text-bone">
          <motion.span
            className="block text-[22vw] md:text-[17vw] lg:text-[13rem]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease: EASE_HOUSE, delay: 0.2 }}
          >
            CPAMMA
          </motion.span>
          <motion.span
            aria-hidden
            className="block text-[22vw] text-transparent md:text-[17vw] lg:text-[13rem]"
            style={{ WebkitTextStroke: "1px rgba(255,59,47,0.35)" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: -22 }}
            transition={{ duration: 1.05, ease: EASE_HOUSE, delay: 0.34 }}
          >
            CPAMMA
          </motion.span>
        </h1>

        <motion.div
          className="-mt-[8vw] flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:-mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_HOUSE, delay: 0.5 }}
        >
          {["STRIKING", "GRAPPLING", "WEAPONS"].map((w, i) => (
            <span key={w} className="flex items-center gap-4">
              {i > 0 && <span className="h-1 w-1 rotate-45 bg-blood" />}
              <span className="font-hud text-sm font-semibold tracking-[0.4em] text-bone md:text-base">
                {w}
              </span>
            </span>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_HOUSE, delay: 0.66 }}
        >
          <Link
            href="/contact"
            className="border border-blood bg-blood px-8 py-3.5 font-mono text-[11px] tracking-hud text-void transition-colors duration-300 hover:bg-transparent hover:text-blood"
          >
            GET YOUR PASS — UP TO 1 MONTH FREE
          </Link>
          <Link
            href="/programs"
            className="border border-white/15 px-8 py-3.5 font-mono text-[11px] tracking-hud text-bone transition-colors duration-300 hover:border-bone"
          >
            EXPLORE THE PROGRAMS
          </Link>
        </motion.div>

        {/* live next-session readout */}
        <motion.div
          className="mt-10 flex items-center gap-3 border border-white/10 bg-void/70 px-4 py-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_HOUSE, delay: 0.8 }}
        >
          <span className="live-dot" />
          {next ? (
            <p className="font-mono text-[10px] tracking-hud text-steel md:text-[11px]">
              NEXT SESSION — <span className="text-bone">{next.item.name}</span>{" "}
              · {next.dayLabel} {next.clock}
              {next.isToday && next.startsInMin < 600 && (
                <span className="text-blood">
                  {" "}
                  · T-{Math.floor(next.startsInMin / 60)}H{" "}
                  {next.startsInMin % 60}M
                </span>
              )}
            </p>
          ) : (
            <p className="font-mono text-[10px] tracking-hud text-steel">
              SYNCING TIMETABLE…
            </p>
          )}
        </motion.div>
      </div>

      {/* floating stat chips */}
      <FloatChip k={HERO_STATS[0].k} v={HERO_STATS[0].v} className="left-[6%] top-[24%]" delay={0.9} drift={-8} />
      <FloatChip k={HERO_STATS[1].k} v={HERO_STATS[1].v} className="right-[7%] top-[21%]" delay={1.0} drift={7} />
      <FloatChip k={HERO_STATS[2].k} v={HERO_STATS[2].v} className="left-[9%] bottom-[22%]" delay={1.1} drift={6} />
      <FloatChip k={HERO_STATS[3].k} v={HERO_STATS[3].v} className="right-[9%] bottom-[26%]" delay={1.2} drift={-7} />

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] tracking-tag text-steel">
            SCROLL TO DECONSTRUCT
          </span>
          <motion.span
            className="block h-8 w-px bg-gradient-to-b from-blood to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
