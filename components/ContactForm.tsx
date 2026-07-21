"use client";

import { useState } from "react";
import { PROGRAM_PAGES } from "@/lib/pages";
import { GYM } from "@/lib/data";

/**
 * Trial-class inquiry form. Demo build: composes a pre-filled email to the
 * gym (their real intake is email-first anyway). Swap handleSubmit for a
 * POST to a route handler when a backend lands.
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState(PROGRAM_PAGES[0].name);
  const [age, setAge] = useState("Adult (18+)");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      `Age of student: ${age}`,
      `Primary program of interest: ${program}`,
      notes && `\n${notes}`,
      `\n(Sent from the CPAMMA site — free trial inquiry)`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${GYM.email}?subject=${encodeURIComponent(
      `Free Trial Class — ${name || "New Student"}`
    )}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "w-full border border-white/10 bg-void/60 px-4 py-3 font-body text-sm text-bone placeholder:text-steel/60 outline-none transition-colors duration-300 focus:border-blood";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="hud-tag">NAME *</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-2 ${field}`}
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="hud-tag">EMAIL *</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-2 ${field}`}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="hud-tag">PHONE</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`mt-2 ${field}`}
            placeholder="(814) …"
            autoComplete="tel"
          />
        </label>
        <label className="block">
          <span className="hud-tag">AGE OF STUDENT</span>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={`mt-2 ${field}`}
          >
            {["Adult (18+)", "Teen (13–17)", "Youth (5–12)", "Mighty Mites (3–4)"].map(
              (a) => (
                <option key={a} className="bg-void">
                  {a}
                </option>
              )
            )}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="hud-tag">PRIMARY PROGRAM OF INTEREST</span>
        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className={`mt-2 ${field}`}
        >
          {PROGRAM_PAGES.map((p) => (
            <option key={p.slug} className="bg-void">
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="hud-tag">GOALS / QUESTIONS</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className={`mt-2 ${field}`}
          placeholder="Self-defense, fitness, competition, just curious…"
        />
      </label>
      <button
        type="submit"
        className="w-full border border-blood bg-blood py-4 font-mono text-[11px] tracking-hud text-void transition-colors duration-300 hover:bg-transparent hover:text-blood"
      >
        SEND INQUIRY — OPENS YOUR EMAIL ▸
      </button>
      <p className="text-center font-mono text-[8.5px] leading-relaxed text-steel/70">
        SUBMITTING OPENS A PRE-FILLED EMAIL TO {GYM.email.toUpperCase()} — THE
        GYM CONFIRMS EVERY FIRST VISIT BY EMAIL BEFORE YOU COME IN.
      </p>
    </form>
  );
}
