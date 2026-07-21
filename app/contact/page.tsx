import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { CONTACT_NOTICES } from "@/lib/pages";
import { GYM } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact & Free Trial",
  description:
    "Schedule your free trial class at CPAMMA — 1445 West College Ave, State College, PA. Email info@cpamma.com or call 814-422-KICK. Up to 1 month free.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        tag="OPEN A CHANNEL — FREE TRIAL"
        title="GET YOUR"
        accent="PASS."
        sub="Your first class is on us — up to one month free. Every first visit starts with an email, so tell us who you are and what you want to train."
      />

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 pb-24 md:grid-cols-[1fr_380px] md:px-8">
        <Reveal>
          <div className="brackets border border-white/[0.08] bg-panel/50 px-6 py-7 md:px-8">
            <ContactForm />
          </div>
        </Reveal>

        <div className="space-y-4">
          <Reveal delay={0.1}>
            <div className="border border-white/[0.08] bg-panel/50 px-6 py-6">
              <p className="hud-tag mb-3">COORDINATES</p>
              <p className="font-body text-sm leading-relaxed text-bone/90">
                {GYM.address}
              </p>
              <p className="mt-1.5 font-body text-xs leading-relaxed text-steel">
                {GYM.addressNote}
              </p>
              <p className="mt-3 font-mono text-[10px] tracking-wide text-bone/80">
                {GYM.phone}
                <br />
                <a href={`mailto:${GYM.email}`} className="text-blood">
                  {GYM.email}
                </a>
              </p>
              <a
                href="https://maps.google.com/?q=1445+West+College+Ave,+State+College,+PA+16801"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block border border-white/15 px-5 py-2.5 font-mono text-[9px] tracking-hud text-bone transition-colors duration-300 hover:border-blood hover:text-blood"
              >
                OPEN IN MAPS ↗
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="border border-white/[0.08] bg-panel/50 px-6 py-6">
              <p className="hud-tag mb-3">GYM HOURS</p>
              <ul className="space-y-1.5">
                {GYM.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex justify-between border-b border-white/[0.05] pb-1.5 font-mono text-[10px] tracking-wide"
                  >
                    <span className="text-bone/80">{h.day}</span>
                    <span className="text-steel">{h.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="border border-blood/30 bg-panel/50 px-6 py-6">
              <p className="hud-tag mb-3">BEFORE YOU VISIT</p>
              <ul className="space-y-2.5">
                {CONTACT_NOTICES.map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-2.5 font-body text-xs leading-relaxed text-steel"
                  >
                    <span className="mt-[2px] font-mono text-blood">▸</span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
