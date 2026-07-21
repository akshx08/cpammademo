import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { RATES, RATE_FOOTNOTES, GYM } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Membership Rates | CPAMMA State College" },
  description:
    "The lowest rates in Central PA — PSU students $99/mo, half-off special $109/mo, all access $159/mo. No startup fees, no cancellation fees, no long-term contracts. Up to 1 month free.",
};

const RETURNING = [
  {
    name: "ONE PROGRAM",
    price: 159,
    lines: ["$99 reinstatement fee", "25% off the standard rate", "Unlimited classes in 1 program", "Youth: 2 classes per week"],
  },
  {
    name: "ALL ACCESS",
    price: 199,
    lines: ["$99 reinstatement fee", "35% off the standard rate", "Unlimited classes in 3 programs", "Adult classes only"],
  },
  {
    name: "STANDARD RATE",
    price: 219,
    lines: ["$99 startup fee at standard", "One program $219 · All access $319", "The special rates above waive both fees", "Youth: 1 class per week"],
  },
];

const EQUIPMENT = [
  { item: "Adult gloves", price: "$29.99 + tax" },
  { item: "Shin pads", price: "$29.99 + tax" },
  { item: "Glove / shin pad rental", price: "$5" },
  { item: "Gis (adult)", price: "$109.99 + tax and up" },
  { item: "Teen Jiu-Jitsu gi", price: "$119.99 + tax" },
  { item: "Sticks (RBMMA)", price: "$39.99 + tax" },
  { item: "Youth quarterly testing", price: "$39" },
  { item: "Youth monthly merit badge", price: "$5" },
];

export default function RatesPage() {
  return (
    <>
      <PageHeader
        tag="ACCESS PROTOCOLS — LOCK YOUR RATE"
        title="$0"
        accent="TO START."
        sub="No startup fees. No cancellation fees. No long-term contracts. The lowest rates in Central PA with the most certified instructors and the most classes — locked in for as long as you stay a member."
      />

      {/* new member cards */}
      <section className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {RATES.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col px-7 py-8 ${
                  r.featured
                    ? "brackets border border-blood/60 bg-panel"
                    : "border border-white/[0.08] bg-panel/50"
                }`}
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
                <Link
                  href="/contact"
                  className={`mt-8 block py-3 text-center font-mono text-[10px] tracking-hud transition-colors duration-300 ${
                    r.featured
                      ? "bg-blood text-void hover:bg-transparent hover:text-blood hover:outline hover:outline-1 hover:outline-blood"
                      : "border border-white/15 text-bone hover:border-blood hover:text-blood"
                  }`}
                >
                  CLAIM THIS RATE ▸
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <ul className="mx-auto mt-8 max-w-3xl space-y-1.5 text-center">
            {RATE_FOOTNOTES.map((f) => (
              <li
                key={f}
                className="font-mono text-[9px] tracking-wide text-steel"
              >
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* returning members + equipment */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8">
        <Reveal>
          <p className="hud-tag mb-6">RETURNING MEMBERS &amp; STANDARD RATE</p>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-3">
          {RETURNING.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <div className="h-full border border-white/[0.07] bg-panel/50 px-6 py-6">
                <p className="font-hud text-sm font-semibold tracking-hud text-bone">
                  {r.name}
                </p>
                <p className="mt-2 font-display text-4xl text-bone">
                  ${r.price}
                  <span className="font-hud text-sm text-steel">/mo</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {r.lines.map((l) => (
                    <li
                      key={l}
                      className="flex items-start gap-2 font-mono text-[9.5px] leading-relaxed text-steel"
                    >
                      <span className="mt-[2px] text-blood">▸</span>
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="h-full border border-white/[0.08] bg-panel/50 px-6 py-6">
              <p className="hud-tag mb-4">EQUIPMENT &amp; EXTRAS</p>
              <ul className="space-y-1.5">
                {EQUIPMENT.map((e) => (
                  <li
                    key={e.item}
                    className="flex justify-between gap-4 border-b border-white/[0.05] pb-1.5 font-mono text-[10px] tracking-wide"
                  >
                    <span className="text-bone/80">{e.item}</span>
                    <span className="text-steel">{e.price}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[8.5px] leading-relaxed text-steel/70">
                ALL EQUIPMENT AND UNIFORMS FROM CPAMMA FOR CLASS CONSISTENCY.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full border border-white/[0.08] bg-panel/50 px-6 py-6">
              <p className="hud-tag mb-4">GOOD TO KNOW</p>
              <ul className="space-y-2.5 font-body text-xs leading-relaxed text-steel">
                <li>
                  <span className="font-mono text-blood">▸</span>{" "}
                  <strong className="text-bone/90">Online University included</strong>{" "}
                  with every month-to-month plan — and membership holds ($25/mo)
                  keep your spot and your locked rate while you&apos;re away
                  from State College.
                </li>
                <li>
                  <span className="font-mono text-blood">▸</span>{" "}
                  <strong className="text-bone/90">Visitors train free the first time</strong>{" "}
                  — email {GYM.email} ahead of your trip.
                </li>
                <li>
                  <span className="font-mono text-blood">▸</span>{" "}
                  <strong className="text-bone/90">Private lessons</strong> are
                  available, though public classes are recommended first — the
                  schedule runs morning to late night, 7 days a week.
                </li>
                <li>
                  <span className="font-mono text-blood">▸</span>{" "}
                  <strong className="text-bone/90">Law enforcement train free</strong>{" "}
                  through Adopt-a-Cop Centre County.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        headline="LOCK IT"
        accent="IN."
        sub="Specials are only available the day of your free trial — after that it goes up to the standard rate. Sign up before your first class and save even more."
      />
    </>
  );
}
