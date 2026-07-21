"use client";

import { useEffect, useRef } from "react";
import { FIGHTER_SYSTEMS } from "@/lib/data";

/**
 * The fighter, deconstructed — skeletal telemetry figure drawn bone by bone,
 * then annotated by the constellation label system. Reveal is driven by
 * section-center distance (SCROLL-CINEMA formula), not page height.
 */

// joints — hand-tuned orthodox stance, facing left (viewBox 0 0 200 130)
const J = {
  headTop: { x: 90, y: 11 },
  head: { x: 90, y: 16 },
  neck: { x: 92, y: 26 },
  chest: { x: 94, y: 33 },
  core: { x: 98, y: 58 },
  fShoulder: { x: 84, y: 32 },
  fElbow: { x: 75, y: 40 },
  fFist: { x: 75, y: 28 },
  rShoulder: { x: 102, y: 34 },
  rElbow: { x: 108, y: 46 },
  rFist: { x: 88, y: 32 },
  fHip: { x: 94, y: 61 },
  rHip: { x: 102, y: 60 },
  fKnee: { x: 85, y: 85 },
  fFoot: { x: 79, y: 112 },
  rKnee: { x: 113, y: 87 },
  rFoot: { x: 123, y: 110 },
};

const BONES: [keyof typeof J, keyof typeof J][] = [
  ["head", "neck"],
  ["neck", "chest"],
  ["chest", "core"],
  ["chest", "fShoulder"],
  ["fShoulder", "fElbow"],
  ["fElbow", "fFist"],
  ["chest", "rShoulder"],
  ["rShoulder", "rElbow"],
  ["rElbow", "rFist"],
  ["core", "fHip"],
  ["core", "rHip"],
  ["fHip", "fKnee"],
  ["fKnee", "fFoot"],
  ["rHip", "rKnee"],
  ["rKnee", "rFoot"],
];

// map system node anchors into the widened viewBox (+50 x);
// labels get their own y so stacked neighbors never collide
const LABEL_Y: Record<string, number> = {
  mind: 14,
  striking: 28,
  guard: 22,
  engine: 48,
  base: 60,
  footwork: 111,
};
const NODES = FIGHTER_SYSTEMS.map((s) => ({
  ...s,
  x: s.at.x + 50,
  y: s.at.y,
  labelY: LABEL_Y[s.id] ?? s.at.y,
  labelX: s.side === "left" ? 8 : 192,
  elbowX: s.side === "left" ? 40 : 160,
}));

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export default function FighterDeconstructed() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const sysRef = useRef<HTMLSpanElement>(null);
  const techRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const bones = svg.querySelectorAll<SVGLineElement>("[data-bone]");
    const joints = svg.querySelectorAll<SVGCircleElement>("[data-joint]");
    const leaders = svg.querySelectorAll<SVGPolylineElement>("[data-leader]");
    const nodes = svg.querySelectorAll<SVGCircleElement>("[data-node]");
    const labels = svg.querySelectorAll<SVGGElement>("[data-label]");
    const wires = svg.querySelectorAll<SVGLineElement>("[data-wire]");

    let raf = 0;
    let running = true;

    const apply = (reveal: number, opacity: number) => {
      svg.style.opacity = String(clamp(opacity, 0.05, 1));
      bones.forEach((b, i) => {
        const r = clamp(reveal * 1.9 - i * 0.04);
        b.style.strokeDashoffset = String(1 - r);
      });
      joints.forEach((j, i) => {
        const r = clamp(reveal * 1.8 - 0.25 - i * 0.03);
        j.style.opacity = String(r);
      });
      leaders.forEach((l, i) => {
        const r = clamp(reveal * 1.9 - 0.55 - i * 0.1);
        l.style.strokeDashoffset = String(1 - r);
      });
      nodes.forEach((n, i) => {
        const r = clamp(reveal * 1.9 - 0.55 - i * 0.1);
        n.style.opacity = String(r);
        n.style.transform = `scale(${0.4 + r * 0.6})`;
      });
      labels.forEach((l, i) => {
        const r = clamp(reveal * 1.9 - 0.62 - i * 0.1);
        l.style.opacity = String(r);
      });
      wires.forEach((w, i) => {
        const r = clamp(reveal * 1.6 - 0.8 - i * 0.05);
        w.style.strokeDashoffset = String(1 - r);
      });
      let online = 0;
      NODES.forEach((_, i) => {
        if (clamp(reveal * 1.9 - 0.55 - i * 0.1) > 0.5) online++;
      });
      if (sysRef.current)
        sysRef.current.textContent = `${online}/${NODES.length}`;
      if (techRef.current)
        techRef.current.textContent = String(Math.floor(reveal * 218))
          .padStart(3, "0");
    };

    if (reduced) {
      apply(1, 1);
      return;
    }

    const loop = () => {
      if (!running) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // only compute while near the viewport
      if (rect.bottom > -vh && rect.top < vh * 2) {
        const dist = Math.abs(rect.top + rect.height / 2 - vh / 2) / vh;
        const opacity = clamp(1.15 - dist * 2.6);
        const reveal = clamp(1.25 - dist * 2.4);
        apply(reveal, opacity);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="system"
      ref={sectionRef}
      className="relative mx-auto flex min-h-[130vh] w-full max-w-7xl flex-col justify-center px-4 py-24 md:px-8"
    >
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="hud-tag">MODULE 00 — THE PRODUCT</p>
          <h2 className="mt-3 font-display text-5xl leading-[0.9] text-bone md:text-7xl">
            THE FIGHTER,
            <br />
            <span className="text-blood">DECONSTRUCTED</span>
          </h2>
        </div>
        <div className="hidden text-right md:block">
          <p className="font-mono text-[10px] tracking-hud text-steel">
            SYSTEMS ONLINE{" "}
            <span ref={sysRef} className="text-blood">
              0/6
            </span>
          </p>
          <p className="mt-1 font-mono text-[10px] tracking-hud text-steel">
            TECHNIQUES INDEXED{" "}
            <span ref={techRef} className="text-blood">
              000
            </span>
            /218
          </p>
        </div>
      </div>

      <p className="mb-8 max-w-xl font-body text-sm leading-relaxed text-steel">
        Every member is a build in progress. Six systems, trained by
        specialists, assembled in one 10,000 sq ft facility. This is the
        complete fighter — and every component has a class on the timetable.
      </p>

      <div className="relative mx-auto w-full max-w-4xl">
        {/* radar rings behind the figure */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 50% 46%, rgba(255,59,47,0.10) 0%, transparent 40%)",
          }}
        />
        <svg
          ref={svgRef}
          viewBox="0 0 200 130"
          className="w-full"
          role="img"
          aria-label="Wireframe fighter with labeled systems: mind, striking, guard, engine, grappling base, footwork"
          style={{ opacity: 0.05 }}
        >
          {/* faint grid rings from the core */}
          {[18, 34, 52].map((r) => (
            <circle
              key={r}
              cx={98}
              cy={58}
              r={r}
              fill="none"
              stroke="rgba(201,205,212,0.07)"
              strokeWidth={0.3}
            />
          ))}

          {/* bones */}
          {BONES.map(([a, b], i) => (
            <line
              key={i}
              data-bone
              x1={J[a].x}
              y1={J[a].y}
              x2={J[b].x}
              y2={J[b].y}
              stroke="#F4F1EC"
              strokeWidth={0.9}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              style={{ filter: "drop-shadow(0 0 2px rgba(244,241,236,0.35))" }}
            />
          ))}
          {/* head */}
          <circle
            data-bone
            cx={J.head.x}
            cy={J.head.y}
            r={5.2}
            fill="none"
            stroke="#F4F1EC"
            strokeWidth={0.9}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
          />

          {/* joints */}
          {Object.entries(J).map(([k, p]) =>
            k === "head" || k === "headTop" ? null : (
              <circle
                key={k}
                data-joint
                cx={p.x}
                cy={p.y}
                r={1.15}
                fill="#060507"
                stroke="#FF3B2F"
                strokeWidth={0.55}
                style={{ opacity: 0 }}
              />
            )
          )}

          {/* constellation wires between system nodes */}
          {NODES.map((n, i) => {
            const m = NODES[(i + 1) % NODES.length];
            return (
              <line
                key={`w${i}`}
                data-wire
                x1={n.x}
                y1={n.y}
                x2={m.x}
                y2={m.y}
                stroke="rgba(255,59,47,0.16)"
                strokeWidth={0.35}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
            );
          })}

          {/* leader lines + nodes + labels */}
          {NODES.map((n) => {
            const labelY = n.labelY;
            return (
              <g key={n.id}>
                <polyline
                  data-leader
                  points={`${n.x},${n.y} ${n.elbowX},${labelY} ${n.labelX + (n.side === "left" ? 24 : -24)},${labelY}`}
                  fill="none"
                  stroke="rgba(255,59,47,0.55)"
                  strokeWidth={0.4}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                />
                <circle
                  data-node
                  cx={n.x}
                  cy={n.y}
                  r={1.8}
                  fill="#FF3B2F"
                  style={{
                    opacity: 0,
                    transformOrigin: `${n.x}px ${n.y}px`,
                    filter: "drop-shadow(0 0 3px rgba(255,59,47,0.8))",
                  }}
                />
                <g
                  data-label
                  style={{ opacity: 0 }}
                  textAnchor={n.side === "left" ? "start" : "end"}
                >
                  <text
                    x={n.labelX}
                    y={labelY - 1.4}
                    fill="#F4F1EC"
                    style={{
                      font: "600 4.4px var(--font-jetbrains), monospace",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {n.label}
                  </text>
                  <text
                    x={n.labelX}
                    y={labelY + 3.6}
                    fill="#8B8F98"
                    style={{
                      font: "400 3.1px var(--font-jetbrains), monospace",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {n.spec}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:hidden">
        <p className="font-mono text-[10px] tracking-hud text-steel">
          SYSTEMS <span className="text-blood">6/6</span> · 218 TECHNIQUES
          INDEXED
        </p>
      </div>
    </section>
  );
}
