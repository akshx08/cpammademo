"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_HOUSE, VIEW, fadeUp, cardDelay } from "@/lib/motion";
import { PROGRAM_PAGES } from "@/lib/pages";

/** landing teaser — seven modules, each routing to its full page */
export default function ProgramsTeaser() {
  return (
    <section
      id="modules"
      className="relative mx-auto w-full max-w-7xl px-4 py-28 md:px-8"
    >
      <motion.div
        className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        {...fadeUp(0)}
      >
        <div>
          <p className="hud-tag">TRAINING MODULES — 07 SYSTEMS</p>
          <h2 className="mt-3 font-display text-5xl leading-[0.9] text-bone md:text-7xl">
            SEVEN SYSTEMS.
            <br />
            ONE BUILD.
          </h2>
        </div>
        <p className="max-w-sm font-body text-sm leading-relaxed text-steel">
          Every program taught by a specialist — the only school in Central PA
          with certified instructors in Muay Thai, BJJ, Boxing, Judo, Jeet Kune
          Do, and Filipino Martial Arts.
        </p>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PROGRAM_PAGES.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{
              duration: 0.8,
              ease: EASE_HOUSE,
              delay: cardDelay(i % 3),
            }}
            className={i === 6 ? "sm:col-span-2 lg:col-span-1" : ""}
          >
            <Link
              href={`/programs/${p.slug}`}
              className="group relative block overflow-hidden border border-white/[0.07] bg-panel/60 transition-colors duration-500 ease-house hover:border-blood/60"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale-[0.4] transition-all duration-700 ease-house group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                <span className="absolute left-3 top-3 font-mono text-[9px] tracking-tag text-bone/60">
                  MODULE {String(i + 1).padStart(2, "0")} — {p.system}
                </span>
              </div>
              <div className="flex items-end justify-between px-4 pb-4">
                <div>
                  <h3 className="font-display text-2xl text-bone md:text-3xl">
                    {p.name.toUpperCase()}
                  </h3>
                  <p className="mt-1 font-mono text-[9px] tracking-hud text-blood">
                    {p.price}
                  </p>
                </div>
                <span className="mb-1 font-mono text-lg text-steel transition-all duration-300 group-hover:translate-x-1 group-hover:text-blood">
                  ▸
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
