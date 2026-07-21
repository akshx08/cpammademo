import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { PROGRAM_PAGES } from "@/lib/pages";

export function generateStaticParams() {
  return PROGRAM_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = PROGRAM_PAGES.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: { absolute: p.seoTitle },
    description: p.intro[0]?.slice(0, 155),
  };
}

export default function ProgramPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = PROGRAM_PAGES.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const i = PROGRAM_PAGES.indexOf(p);

  return (
    <>
      {/* program hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={p.img}
            alt={p.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
            style={{ filter: "grayscale(0.5) contrast(1.1) brightness(0.8)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(6,5,7,0.55), rgba(6,5,7,0.92)), radial-gradient(ellipse at 50% 100%, rgba(255,59,47,0.14), transparent 60%)",
            }}
          />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-36 md:px-8 md:pt-44">
          <Reveal>
            <p className="hud-tag">
              MODULE {String(i + 1).padStart(2, "0")} — {p.system}
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.9] text-bone md:text-8xl">
              {p.name.toUpperCase()}
            </h1>
            <p className="mt-4 font-hud text-sm font-semibold tracking-hud text-blood">
              {p.price} · FIRST CLASS FREE
            </p>
          </Reveal>
        </div>
      </section>

      {/* copy + schedule */}
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 md:grid-cols-[1.4fr_1fr] md:px-8">
        <div>
          {p.intro.map((para, pi) => (
            <Reveal key={pi} delay={pi * 0.06}>
              <p className="mb-4 max-w-2xl font-body text-sm leading-relaxed text-steel">
                {para}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <ul className="mt-6 space-y-2.5">
              {p.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 font-mono text-[11px] leading-relaxed tracking-wide text-bone/85"
                >
                  <span className="mt-[3px] text-blood">▸</span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.28}>
            <Link
              href="/contact"
              className="mt-8 inline-block border border-blood bg-blood px-8 py-3.5 font-mono text-[10px] tracking-hud text-void transition-colors duration-300 hover:bg-transparent hover:text-blood"
            >
              SCHEDULE YOUR FREE TRIAL ▸
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="brackets border border-white/[0.08] bg-panel/60 px-6 py-6">
            <p className="hud-tag mb-4">PROGRAM SCHEDULE</p>
            <ul className="space-y-2">
              {p.schedule.map((s, si) => (
                <li
                  key={si}
                  className="flex items-baseline justify-between gap-4 border-b border-white/[0.05] pb-2"
                >
                  <span className="shrink-0 font-mono text-[9.5px] tracking-hud text-blood">
                    {s.label.toUpperCase()}
                  </span>
                  <span className="text-right font-mono text-[10px] leading-relaxed text-bone/85">
                    {s.value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[8.5px] leading-relaxed text-steel/70">
              ANY RANK CAN ATTEND ANY TIME SLOT INSIDE THEIR PROGRAM. FULL WEEK
              GRID ON THE{" "}
              <Link href="/schedule" className="text-blood">
                SCHEDULE PAGE
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>

      {/* extras */}
      {p.extras.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-8">
          <div className="grid gap-3 md:grid-cols-2">
            {p.extras.map((e, ei) => (
              <Reveal key={e.heading} delay={(ei % 2) * 0.1}>
                <div className="h-full border border-white/[0.07] bg-panel/50 px-6 py-6">
                  <h3 className="font-hud text-base font-semibold tracking-wide text-bone">
                    {e.heading}
                  </h3>
                  <p className="mt-2.5 font-body text-xs leading-relaxed text-steel">
                    {e.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* second image + testimonials */}
      <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-8 md:grid-cols-2 md:px-8">
        <Reveal>
          <div className="brackets relative aspect-[4/3] overflow-hidden">
            <Image
              src={p.img2}
              alt={`${p.name} at CPAMMA`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{
                filter:
                  "grayscale(0.1) contrast(1.08) brightness(1.02) saturate(1.12)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(6,5,7,0.5), transparent 40%)",
              }}
            />
          </div>
        </Reveal>
        <div className="space-y-4">
          {p.testimonials.map((t, ti) => (
            <Reveal key={ti} delay={ti * 0.1}>
              <blockquote className="border border-white/[0.07] bg-panel/50 px-6 py-5">
                <p className="font-mono text-[9px] tracking-widest text-blood">
                  ★★★★★
                </p>
                <p className="mt-2.5 font-body text-[13px] leading-relaxed text-bone/85">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-2.5 font-mono text-[9px] tracking-hud text-steel">
                  — {t.name.toUpperCase()}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
