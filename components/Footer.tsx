import Link from "next/link";
import { GYM } from "@/lib/data";

const COLS = [
  {
    title: "TRAIN",
    links: [
      { href: "/programs", label: "All Programs" },
      { href: "/programs/brazilian-jiu-jitsu", label: "Brazilian Jiu-Jitsu" },
      { href: "/programs/striking", label: "Muay Thai & Boxing" },
      { href: "/programs/mixed-martial-arts", label: "Mixed Martial Arts" },
      { href: "/programs/youth-martial-arts", label: "Youth Martial Arts" },
      { href: "/programs/womens-kickboxing", label: "Women's Kickboxing" },
    ],
  },
  {
    title: "GYM",
    links: [
      { href: "/schedule", label: "Schedule" },
      { href: "/rates", label: "Rates" },
      { href: "/instructors", label: "Instructors" },
      { href: "/fighters", label: "Fight Team" },
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "START",
    links: [
      { href: "/contact", label: "Free Trial" },
      { href: "/psu", label: "PSU Students" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.07] bg-void">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_repeat(3,1fr)_1.2fr] md:px-8">
        <div>
          <p className="font-display text-2xl text-bone">
            CPAMMA<span className="text-blood">.</span>
          </p>
          <p className="mt-2 font-mono text-[10px] leading-relaxed tracking-hud text-steel">
            {GYM.tagline}
          </p>
          <p className="mt-4 font-body text-xs leading-relaxed text-steel">
            {GYM.address}
            <br />
            {GYM.addressNote}
          </p>
          <p className="mt-3 font-mono text-[10px] tracking-wide text-bone/80">
            {GYM.phone}
            <br />
            <a href={`mailto:${GYM.email}`} className="text-blood">
              {GYM.email}
            </a>
          </p>
          <div className="mt-3 flex gap-4">
            <a
              href={GYM.instagram}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] tracking-hud text-steel transition-colors hover:text-blood"
            >
              INSTAGRAM ↗
            </a>
            <a
              href={GYM.facebook}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] tracking-hud text-steel transition-colors hover:text-blood"
            >
              FACEBOOK ↗
            </a>
          </div>
        </div>

        {COLS.map((c) => (
          <div key={c.title}>
            <p className="hud-tag mb-4">{c.title}</p>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-xs text-steel transition-colors duration-300 hover:text-bone"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="hud-tag mb-4">GYM HOURS</p>
          <ul className="space-y-1.5">
            {GYM.hours.map((h) => (
              <li
                key={h.day}
                className="flex justify-between gap-3 border-b border-white/[0.05] pb-1.5 font-mono text-[10px] tracking-wide"
              >
                <span className="text-bone/80">{h.day}</span>
                <span className="text-right text-steel">{h.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-mono text-[8.5px] leading-relaxed text-steel/70">
            DOOR MAY BE LOCKED FOR SELECT CLASSES — FIRST-TIME VISITORS ALWAYS
            EMAIL FIRST.
          </p>
        </div>
      </div>
      <div className="border-t border-white/[0.05]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 md:flex-row md:px-8">
          <p className="font-mono text-[8.5px] tracking-hud text-steel/60">
            CPAMMA.SYS — CONCEPT REBUILD · DEMO V2 · 2026
          </p>
          <p className="font-mono text-[8.5px] tracking-hud text-steel/60">
            LOCATION LOCK {GYM.coords} · 70+ HRS/WK · 7 DAYS
          </p>
        </div>
      </div>
    </footer>
  );
}
