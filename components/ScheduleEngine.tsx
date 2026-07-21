"use client";

import { motion } from "framer-motion";
import { EASE_HOUSE, VIEW } from "@/lib/motion";
import {
  SCHEDULE,
  DAYS,
  CAT_META,
  type ScheduleItem,
  type ClassCat,
} from "@/lib/data";
import { useNextClass } from "@/lib/useNextClass";

const START = 7; // 7:00
const END = 22; // 22:00
const SPAN = END - START;

const fmt = (h: number) => {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  const h12 = ((hh + 11) % 12) + 1;
  return `${h12}${mm ? ":" + mm.toString().padStart(2, "0") : ""}${hh >= 12 ? "P" : "A"}`;
};

/** greedy lane assignment per day so overlapping classes sit side by side */
function layoutDay(items: ScheduleItem[]) {
  const sorted = [...items].sort(
    (a, b) => a.start - b.start || b.end - a.end
  );
  const laneEnds: number[] = [];
  const placed = sorted.map((item) => {
    let lane = laneEnds.findIndex((end) => end <= item.start + 0.001);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(item.end);
    } else {
      laneEnds[lane] = item.end;
    }
    return { item, lane };
  });
  return { placed, laneCount: Math.max(1, laneEnds.length) };
}

function cellClass(cat: ClassCat): string {
  switch (CAT_META[cat].style) {
    case "solid":
      return "bg-blood/85 text-void";
    case "outline":
      return "border border-blood/80 bg-blood/10 text-blood";
    case "stripe":
      return "border border-blood/60 text-bone [background:repeating-linear-gradient(135deg,rgba(255,59,47,0.28)_0_6px,rgba(255,59,47,0.08)_6px_12px)]";
    case "dim-solid":
      return "bg-bone/15 text-bone border border-white/10";
    case "dashed":
      return "border border-dashed border-blood/70 bg-transparent text-blood/90";
    case "pro":
      return "border border-white/20 bg-void text-steel";
    default:
      return "bg-white/[0.04] border border-white/10 text-steel";
  }
}

function LegendChip({ cat }: { cat: ClassCat }) {
  return (
    <span className="flex items-center gap-2 font-mono text-[9px] tracking-hud text-steel">
      <span className={`h-3 w-3 ${cellClass(cat)}`} />
      {CAT_META[cat].label}
    </span>
  );
}

export default function ScheduleEngine() {
  const next = useNextClass();
  const cats: ClassCat[] = [
    "bjj",
    "striking",
    "mma",
    "youth",
    "rbmma",
    "open",
    "pro",
    "private",
  ];

  return (
    <section
      id="schedule"
      className="relative mx-auto w-full max-w-7xl px-4 py-28 md:px-8"
    >
      <motion.div
        className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: 0.85, ease: EASE_HOUSE }}
      >
        <div>
          <p className="hud-tag">THE TIMETABLE — LIVE SYSTEM</p>
          <h2 className="mt-3 font-display text-5xl leading-[0.9] text-bone md:text-7xl">
            THE <span className="text-blood">70-HOUR</span>
            <br />
            ENGINE
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="font-body text-sm leading-relaxed text-steel">
            Early morning to late night, 7 days a week. Any rank can attend any
            time slot inside their program — this grid is the whole machine.
          </p>
          {next && (
            <div className="mt-4 flex items-center gap-2 border border-white/10 bg-panel/60 px-3 py-2">
              <span className="live-dot" />
              <p className="font-mono text-[9px] tracking-hud text-steel">
                NEXT — <span className="text-bone">{next.item.name}</span> ·{" "}
                <span className="text-blood">
                  {next.dayLabel} {next.clock}
                </span>
              </p>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        className="mb-6 flex flex-wrap gap-x-5 gap-y-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 0.85, ease: EASE_HOUSE, delay: 0.15 }}
      >
        {cats.map((c) => (
          <LegendChip key={c} cat={c} />
        ))}
      </motion.div>

      <div className="overflow-x-auto pb-4">
        <div className="min-w-[900px]">
          {/* day headers */}
          <div className="grid grid-cols-[44px_repeat(7,1fr)] gap-x-1.5">
            <div />
            {DAYS.map((d, i) => (
              <motion.p
                key={d}
                className="border-b border-white/10 pb-2 text-center font-hud text-sm font-semibold tracking-hud text-bone"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEW}
                transition={{
                  duration: 0.7,
                  ease: EASE_HOUSE,
                  delay: i * 0.05,
                }}
              >
                {d}
              </motion.p>
            ))}
          </div>

          {/* grid body */}
          <div className="mt-1.5 grid grid-cols-[44px_repeat(7,1fr)] gap-x-1.5">
            {/* time gutter */}
            <div className="relative h-[760px]">
              {Array.from({ length: SPAN + 1 }, (_, i) => (
                <span
                  key={i}
                  className="absolute right-2 -translate-y-1/2 font-mono text-[9px] text-steel/70"
                  style={{ top: `${(i / SPAN) * 100}%` }}
                >
                  {fmt(START + i)}
                </span>
              ))}
            </div>

            {DAYS.map((_, day) => {
              const { placed, laneCount } = layoutDay(
                SCHEDULE.filter((s) => s.day === day)
              );
              return (
                <div
                  key={day}
                  className="relative h-[760px] border-l border-white/[0.05]"
                >
                  {/* hour lines */}
                  {Array.from({ length: SPAN }, (_, i) => (
                    <span
                      key={i}
                      className="absolute inset-x-0 border-t border-white/[0.045]"
                      style={{ top: `${(i / SPAN) * 100}%` }}
                    />
                  ))}
                  {placed.map(({ item, lane }, idx) => {
                    const top = ((item.start - START) / SPAN) * 100;
                    const height = ((item.end - item.start) / SPAN) * 100;
                    const width = 100 / laneCount;
                    return (
                      <motion.div
                        key={idx}
                        className={`group absolute cursor-default overflow-visible px-1.5 py-1 ${cellClass(item.cat)}`}
                        style={{
                          top: `${top}%`,
                          height: `calc(${height}% - 2px)`,
                          left: `${lane * width}%`,
                          width: `calc(${width}% - 2px)`,
                        }}
                        initial={{ opacity: 0, scaleY: 0.6 }}
                        whileInView={{ opacity: 1, scaleY: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                          duration: 0.6,
                          ease: EASE_HOUSE,
                          delay: 0.2 + idx * 0.03 + day * 0.04,
                        }}
                      >
                        <p className="truncate font-mono text-[8.5px] font-medium leading-tight tracking-wide">
                          {item.name}
                        </p>
                        {item.end - item.start >= 0.5 && (
                          <p className="font-mono text-[8px] opacity-70">
                            {fmt(item.start)}–{fmt(item.end)}
                          </p>
                        )}
                        {/* hover intel chip */}
                        <div
                          className={`pointer-events-none invisible absolute left-1/2 z-30 w-44 -translate-x-1/2 border border-blood/50 bg-void px-3 py-2 opacity-0 transition-all duration-300 ease-house group-hover:visible group-hover:opacity-100 ${
                            item.start < 13 ? "top-full mt-1" : "bottom-full mb-1"
                          }`}
                        >
                          <p className="font-mono text-[9px] tracking-wide text-bone">
                            {item.name}
                          </p>
                          <p className="mt-0.5 font-mono text-[8.5px] text-blood">
                            {DAYS[item.day]} {fmt(item.start)}–{fmt(item.end)}
                          </p>
                          <p className="mt-0.5 font-mono text-[8.5px] uppercase text-steel">
                            {CAT_META[item.cat].label}
                            {item.note ? ` · ${item.note}` : ""}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <motion.p
        className="mt-6 font-mono text-[10px] leading-relaxed tracking-wide text-steel"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 0.85, ease: EASE_HOUSE }}
      >
        ▸ CLASSES &amp; OPEN MATS ARE FOR MEMBERS — FIRST-TIME VISITORS EMAIL{" "}
        <a href="mailto:info@cpamma.com" className="text-blood">
          INFO@CPAMMA.COM
        </a>{" "}
        FIRST · DAILY UPDATES ON{" "}
        <a
          href="https://www.instagram.com/centralpamma"
          target="_blank"
          rel="noreferrer"
          className="text-blood"
        >
          INSTAGRAM
        </a>
      </motion.p>
    </section>
  );
}
