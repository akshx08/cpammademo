import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { FIGHTERS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Fight Team | CPAMMA Fighters Past & Present",
  description:
    "The CPAMMA fight team — pro and amateur records across MMA, Muay Thai, and Boxing. Sparring 6 days a week; fighters in UFC, Bellator, Strikeforce, and Invicta lineage.",
};

export default function FightersPage() {
  return (
    <>
      <PageHeader
        tag="FIGHT TEAM LEDGER — PAST & PRESENT"
        title="THE"
        accent="FIGHTERS"
        sub="CPAMMA has been training fighters for over 20 years, with athletes reaching the UFC, Bellator, Strikeforce, and Invicta. The team competes at Jiu-Jitsu, Muay Thai, and MMA events at least a few times a month — sparring 6 days a week."
      />

      <section className="mx-auto grid w-full max-w-7xl gap-3 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
        {FIGHTERS.map((f, i) => (
          <Reveal key={f.name} delay={(i % 4) * 0.08}>
            <div className="group h-full border border-white/[0.07] bg-panel/50 transition-colors duration-500 ease-house hover:border-blood/50">
              {f.img && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={f.img}
                    alt={f.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale transition-all duration-700 ease-house group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-transparent" />
                  <p className="absolute bottom-2 left-3 font-display text-3xl text-bone">
                    {f.record}
                  </p>
                </div>
              )}
              <div className="px-4 py-4">
                <p className="font-hud text-sm font-semibold tracking-wide text-bone">
                  {f.name}
                </p>
                <p className="mt-0.5 font-mono text-[9px] tracking-hud text-blood">
                  {f.disc.toUpperCase()}
                </p>
                {f.note && (
                  <p className="mt-1.5 font-mono text-[9px] leading-relaxed text-steel">
                    ▸ {f.note}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <CtaBand
        headline="EARN YOUR"
        accent="RECORD."
        sub="Get good first — then compete. Our fighters take all the classes; the path starts with a free trial."
      />
    </>
  );
}
