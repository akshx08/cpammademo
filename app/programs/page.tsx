import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { PROGRAM_PAGES } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Martial Arts Programs in State College, PA",
  description:
    "Seven programs under one roof: Brazilian Jiu-Jitsu, Muay Thai & Boxing, MMA, Youth Martial Arts, Women's Kickboxing, Reality Based MMA, and Cardio Conditioning. First class free.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        tag="TRAINING MODULES — 07 SYSTEMS"
        title="THE"
        accent="PROGRAMS"
        sub="Every program taught by a specialist — the only school in Central PA with certified instructors in Muay Thai, Brazilian Jiu-Jitsu, Boxing, Judo, Jeet Kune Do, and Filipino Martial Arts. Your first class is always free."
      />

      <div className="mx-auto w-full max-w-7xl space-y-4 px-4 pb-16 md:px-8">
        {PROGRAM_PAGES.map((p, i) => (
          <Reveal key={p.slug} delay={0.05}>
            <Link
              href={`/programs/${p.slug}`}
              className="group grid overflow-hidden border border-white/[0.07] bg-panel/50 transition-colors duration-500 ease-house hover:border-blood/60 md:grid-cols-[380px_1fr_auto] md:items-center"
            >
              <div className="relative aspect-[16/9] overflow-hidden md:aspect-[16/10]">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover grayscale-[0.4] transition-all duration-700 ease-house group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-void/60 max-md:bg-gradient-to-t max-md:from-void" />
              </div>
              <div className="px-5 py-5 md:px-8">
                <p className="font-mono text-[9px] tracking-tag text-steel">
                  MODULE {String(i + 1).padStart(2, "0")} — {p.system}
                </p>
                <h2 className="mt-1.5 font-display text-3xl text-bone md:text-4xl">
                  {p.name.toUpperCase()}
                </h2>
                <p className="mt-2 line-clamp-2 max-w-2xl font-body text-xs leading-relaxed text-steel">
                  {p.intro[0]}
                </p>
                <p className="mt-2 font-mono text-[9.5px] tracking-hud text-blood">
                  {p.price}
                </p>
              </div>
              <span className="hidden pr-8 font-mono text-2xl text-steel transition-all duration-300 group-hover:translate-x-1 group-hover:text-blood md:block">
                ▸
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <CtaBand
        headline="FIRST CLASS"
        accent="FREE."
        sub="Not sure which system fits? Try a class first — gloves and gi supplied for your trial. Sign up the day you try it and lock the half-off rate."
      />
    </>
  );
}
