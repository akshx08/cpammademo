import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { ABOUT } from "@/lib/pages";
import { ABOUT_FACTS, PRO_QUOTE } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "About CPAMMA | MMA Gym in State College, PA" },
  description:
    "The most established martial arts gym in Central PA — 10,000 sq ft, full-size boxing ring and octagon, 15+ certified instructors, and the area's most competitive team.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        tag="THE FACILITY — EST. STATE COLLEGE, PA"
        title="THE"
        accent="GYM"
        sub="Quality instruction. Family friendly. The most established martial arts gym in Central PA."
      />

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 pb-16 md:grid-cols-2 md:px-8">
        <div>
          {ABOUT.paras.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className="mb-4 max-w-xl font-body text-sm leading-relaxed text-steel">
                {p}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.25}>
            <ul className="mt-6 space-y-2.5">
              {ABOUT.differentiators.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-2.5 font-mono text-[10.5px] leading-relaxed tracking-wide text-bone/85"
                >
                  <span className="mt-[3px] text-blood">▸</span>
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="brackets relative aspect-[4/5] overflow-hidden">
            <Image
              src="/media/BJJ-Group-Greg-Nelson-1.jpg"
              alt="The CPAMMA team on the mats"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{
                filter:
                  "grayscale(0.15) contrast(1.08) brightness(1.02) saturate(1.1)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(6,5,7,0.55), transparent 40%), radial-gradient(ellipse at 50% 100%, rgba(255,59,47,0.12), transparent 55%)",
              }}
            />
          </div>
        </Reveal>
      </section>

      {/* hard numbers */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-8">
        <div className="grid grid-cols-2 gap-px border border-white/[0.07] bg-white/[0.07] md:grid-cols-4">
          {ABOUT_FACTS.map((f, i) => (
            <Reveal key={f.k} delay={(i % 4) * 0.08}>
              <div className="h-full bg-void px-5 py-6">
                <p className="font-hud text-4xl font-bold text-bone md:text-5xl">
                  {f.v}
                  <span className="text-blood">.</span>
                </p>
                <p className="mt-1.5 font-mono text-[9px] tracking-hud text-steel">
                  {f.k}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-8">
        <Reveal>
          <blockquote className="brackets mx-auto max-w-2xl border border-blood/30 bg-panel/60 px-8 py-8 text-center">
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
          </blockquote>
        </Reveal>
      </section>

      <CtaBand
        headline="JOIN THE"
        accent="FAMILY."
        sub="Year-round classes, always accepting new students, free parking right outside — on PSU campus in downtown State College."
      />
    </>
  );
}
