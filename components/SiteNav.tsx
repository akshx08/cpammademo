"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_DRAWER } from "@/lib/motion";
import { useEtClock } from "@/lib/useNextClass";

const LINKS = [
  { href: "/programs", label: "PROGRAMS" },
  { href: "/schedule", label: "SCHEDULE" },
  { href: "/instructors", label: "INSTRUCTORS" },
  { href: "/rates", label: "RATES" },
  { href: "/about", label: "ABOUT" },
  { href: "/faq", label: "FAQ" },
  { href: "/psu", label: "PSU" },
];

export default function SiteNav() {
  const clock = useEtClock();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the drawer on route change
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-house ${
        scrolled || open ? "bg-void/90" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="CPAMMA home">
          <span className="flex h-7 w-7 items-center justify-center border border-blood/60">
            <span className="font-display text-sm leading-none text-blood">C</span>
          </span>
          <span className="font-mono text-[11px] tracking-tag text-bone">CPAMMA</span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-mono text-[10px] tracking-hud transition-colors duration-300 hover:text-blood ${
                active(l.href) ? "text-blood" : "text-steel"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 font-mono text-[10px] tracking-hud text-steel lg:flex">
            <span className="live-dot" />
            STATE COLLEGE {clock} ET
          </span>
          <Link
            href="/contact"
            className="hidden border border-blood bg-blood/10 px-3 py-1.5 font-mono text-[10px] tracking-hud text-blood transition-colors duration-300 hover:bg-blood hover:text-void sm:block"
          >
            FREE TRIAL
          </Link>
          {/* hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] border border-white/15 xl:hidden"
          >
            <span
              className={`h-px w-4 bg-bone transition-transform duration-300 ease-drawer ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-4 bg-bone transition-transform duration-300 ease-drawer ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE_DRAWER }}
            className="flex h-[calc(100dvh-57px)] flex-col justify-between overflow-y-auto border-b border-white/10 bg-void px-6 pb-10 pt-8 xl:hidden"
          >
            <div className="space-y-1">
              {[{ href: "/", label: "HOME" }, ...LINKS, { href: "/contact", label: "CONTACT" }].map(
                (l, i) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`flex items-baseline justify-between border-b border-white/[0.06] py-3 ${
                      active(l.href) ? "text-blood" : "text-bone"
                    }`}
                  >
                    <span className="font-display text-3xl">{l.label}</span>
                    <span className="font-mono text-[9px] tracking-tag text-steel">
                      {String(i).padStart(2, "0")}
                    </span>
                  </Link>
                )
              )}
            </div>
            <div className="mt-8">
              <Link
                href="/contact"
                className="block border border-blood bg-blood py-3.5 text-center font-mono text-[11px] tracking-hud text-void"
              >
                GET YOUR PASS — UP TO 1 MONTH FREE
              </Link>
              <p className="mt-4 text-center font-mono text-[9px] tracking-hud text-steel">
                1445 WEST COLLEGE AVE · STATE COLLEGE, PA
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
