# CPAMMA DEMO V1 — "The Fighter System"

From-the-future concept rebuild of [cpamma.com](https://www.cpamma.com) (Central PA MMA, State College).
Every fact, photo, price, name, and schedule slot is real — crawled from the live site 2026-07-20
(full source: [CONTENT-DOSSIER.md](CONTENT-DOSSIER.md)).

## Run

```bash
npm install
npm run dev   # http://localhost:3000
```

## Concept

Oil-black + tach-red HUD system: the gym presented as a fighter-development OS.

| Act | Section | Signature |
|---|---|---|
| 00 | Boot loader | CPAMMA.SYS terminal boot, once per session |
| 01 | Hero | Three.js wireframe octagon cage, floating stat chips, **live NEXT SESSION countdown computed from the real timetable** |
| 02 | The Fighter, Deconstructed | mocap-style wireframe fighter drawn bone-by-bone on scroll, CALIBRE-style annotation constellation (6 systems), live counters |
| 03 | Training Modules | 6 real programs, photos resolve from blueprint-wireframe state, scan-bar sweep |
| 04 | The 70-Hour Engine | full week timetable as a HUD heat grid — lane-packed overlaps, category coding, hover intel chips |
| 05 | The Lineage | constellation graph: Ajarn Chai / Erik Paulson / Dan Inosanto converge on Ryan "Guard Dog" Gruhn; 12 personnel files; fight-team ledger marquee |
| 06 | Proof | 8 hard numbers, Ed Ruth pro citation, 500+ ★ reviews masonry |
| 07 | Access | real rates ($99 PSU / $109 half-off / $159 all-access), PSU band, footer with hours + system status |

## Engine notes (house style)

- Hand-written rAF smooth scroll, lerp 0.09, snaps after >250ms frame gaps, disabled <768px & reduced-motion
- Framer Motion reveals only — ease `[0.22,1,0.36,1]`, `once:true`, margin −15%
- Anton display / Rajdhani HUD numerals / JetBrains Mono labels / Inter body
- Accent `#FF3B2F` sampled from the gym's own red ring ropes + logo
- Atmosphere: 3-tier parallax ember canvas, screen-blend aurora, DPR cap 2, reduced-motion gated
- Dev helpers: `/?at=<section-id>` pre-paint deep link · `/?native=1` disables the scroll engine
