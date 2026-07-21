import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { PSU_BLOCKS } from "@/lib/pages";
import { RATES } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "PSU Students | Central PA Mixed Martial Arts" },
  description:
    "400+ Penn State students train at CPAMMA — on campus at 1445 West College Ave, as little as $1 per class with a PSU ID. Home of MMA Club, BJJ Club & Muay Thai Club.",
};

export default function PsuPage() {
  const psuRate = RATES.find((r) => r.id === "psu")!;

  return (
    <>
      <PageHeader
        tag="PENN STATE PROTOCOL — MARTIAL UNIVERSITY"
        title="400+ PSU STUDENTS"
        accent="TRAIN HERE."
        sub="On Penn State property at 1445 West College Ave, behind the IST Building — walk from class, CATA bus stop out front. Come between your Penn State classes: 75+ hours of training time available."
      />

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 pb-16 md:grid-cols-2 md:px-8 lg:grid-cols-3">
        {PSU_BLOCKS.map((b, i) => (
          <Reveal key={b.heading} delay={(i % 3) * 0.08}>
            <div className="h-full border border-white/[0.07] bg-panel/50 px-6 py-6">
              <p className="hud-tag mb-3">{b.heading.toUpperCase()}</p>
              <p className="font-body text-xs leading-relaxed text-steel">
                {b.body}
              </p>
            </div>
          </Reveal>
        ))}

        {/* the PSU rate card */}
        <Reveal delay={0.2}>
          <div className="brackets relative flex h-full flex-col border border-blood/60 bg-panel px-7 py-7">
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-blood px-3 py-0.5 font-mono text-[8px] tracking-tag text-void">
              SHOW PSU ID AT SIGNUP
            </span>
            <p className="font-mono text-[10px] tracking-tag text-steel">
              {psuRate.tag}
            </p>
            <p className="mt-2 font-hud text-lg font-semibold tracking-hud text-bone">
              {psuRate.name}
            </p>
            <p className="mt-3 font-display text-6xl text-bone">
              ${psuRate.price}
              <span className="font-hud text-lg text-steel">{psuRate.per}</span>
            </p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {psuRate.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 font-mono text-[10.5px] leading-relaxed text-bone/80"
                >
                  <span className="mt-[2px] text-blood">▸</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-7 block bg-blood py-3 text-center font-mono text-[10px] tracking-hud text-void transition-colors duration-300 hover:bg-transparent hover:text-blood hover:outline hover:outline-1 hover:outline-blood"
            >
              CLAIM THE STUDENT RATE ▸
            </Link>
          </div>
        </Reveal>
      </section>

      <CtaBand
        headline="BETWEEN"
        accent="CLASSES."
        sub="Try one free class and we promise you'll be hooked — brand new people start every day, so you will fit right in."
      />
    </>
  );
}
