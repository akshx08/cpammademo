import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ScheduleEngine from "@/components/ScheduleEngine";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { GYM } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Class Schedule in State College, PA | CPAMMA" },
  description:
    "70+ hours of martial arts training a week — BJJ, Muay Thai & Boxing, MMA, Youth, Women's Kickboxing, Reality Based MMA. Classes 7 days a week, early morning to late night.",
};

const NOTES = [
  "All students, regardless of rank, can come to any time slot inside the program they are signed up for.",
  "Youth classes are 45 minutes – 1 hour. Most adult classes are 1 hour; 6:30 Gi Grappling runs 1½ hours.",
  "Must attend the class directly before a rolling time slot.",
  "Classes & open mats are strictly for members — non-members and visitors email first.",
  "Daily schedule changes are posted on Instagram and Facebook.",
];

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        tag="THE TIMETABLE — LIVE SYSTEM"
        title="THE 70-HOUR"
        accent="ENGINE"
        sub="Early morning to late night, 7 days a week. Any rank can attend any time slot inside their program — this grid is the whole machine."
      />

      {/* the engine already carries its own header block; give it the page */}
      <div className="-mt-24">
        <ScheduleEngine />
      </div>

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 pb-8 md:grid-cols-2 md:px-8">
        <Reveal>
          <div className="h-full border border-white/[0.08] bg-panel/50 px-6 py-6">
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
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full border border-white/[0.08] bg-panel/50 px-6 py-6">
            <p className="hud-tag mb-4">GRID PROTOCOLS</p>
            <ul className="space-y-2.5">
              {NOTES.map((n) => (
                <li
                  key={n}
                  className="flex items-start gap-2.5 font-body text-xs leading-relaxed text-steel"
                >
                  <span className="mt-[2px] font-mono text-blood">▸</span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <CtaBand
        headline="PICK A"
        accent="SLOT."
        sub="First class free — email before your first visit and we'll point you at the right time slot for your program."
      />
    </>
  );
}
