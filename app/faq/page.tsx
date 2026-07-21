import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { FAQ_SECTIONS } from "@/lib/pages";

export const metadata: Metadata = {
  title: { absolute: "FAQ – MMA Gym in State College, PA | CPAMMA" },
  description:
    "Everything first-timers ask: what to bring, experience needed, class policies, sparring and competition requirements, and how payments and cancellation work.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        tag="KNOWLEDGE BASE — REAL ANSWERS"
        title="THE"
        accent="FAQ"
        sub="What to bring, how classes run, when you can spar, and how billing actually works. If it's not here, email info@cpamma.com."
      />

      <section className="mx-auto w-full max-w-4xl px-4 pb-16 md:px-8">
        {FAQ_SECTIONS.map((sec, si) => (
          <div key={sec.title} className="mb-12">
            <Reveal>
              <p className="hud-tag mb-4">
                {String(si + 1).padStart(2, "0")} — {sec.title.toUpperCase()}
              </p>
            </Reveal>
            <div className="space-y-2">
              {sec.items.map((item, ii) => (
                <Reveal key={item.q} delay={(ii % 4) * 0.05}>
                  <details className="group border border-white/[0.07] bg-panel/50 transition-colors duration-300 open:border-blood/40">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                      <span className="font-hud text-sm font-semibold tracking-wide text-bone">
                        {item.q}
                      </span>
                      <span className="shrink-0 font-mono text-blood transition-transform duration-300 group-open:rotate-90">
                        ▸
                      </span>
                    </summary>
                    <p className="border-t border-white/[0.06] px-5 py-4 font-body text-[13px] leading-relaxed text-steel">
                      {item.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>

      <CtaBand
        headline="STILL"
        accent="UNSURE?"
        sub="The fastest answer is a free trial class — gloves and gi supplied, zero commitment."
      />
    </>
  );
}
