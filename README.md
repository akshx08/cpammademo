# CPAMMA DEMO V2 — Full Site

The multi-page, production-shaped evolution of demo v1: a complete replacement
candidate for [cpamma.com](https://www.cpamma.com). Same "Fighter System"
design language, now routed like a real business site with per-page SEO.
Every fact, photo, price, name, and class time is real — crawled from the live
site (source: [CONTENT-DOSSIER.md](CONTENT-DOSSIER.md)).

## Run

```bash
npm install
npm run dev   # http://localhost:3000 (or -p 3001)
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Cinematic landing — cage hero, fighter deconstruction, program/schedule teasers, reviews |
| `/programs` | Overview of all seven systems |
| `/programs/[slug]` | 7 SEO pages (BJJ, Striking, MMA, Youth, Women's Kickboxing, RBMMA, Cardio) with real per-program schedules — titles match the live site's ranking pattern |
| `/schedule` | The full 70-hour timetable engine + hours + grid protocols |
| `/instructors` | Lineage constellation + personnel files + fight-team marquee |
| `/fighters` | Fight team ledger with records |
| `/rates` | New-member specials, returning-member rates, equipment fees, policies |
| `/about` | Facility, differentiators, numbers, Ed Ruth citation |
| `/faq` | 20 real Q&As in 4 sections (accordion) |
| `/psu` | Penn State page — Martial University clubs, $99 student rate |
| `/contact` | Trial inquiry form (mailto compose — swap for a route handler when a backend lands), coordinates, hours, visit notices |

Plus `sitemap.xml` + `robots.txt`. Production build: 22/22 fully static pages.

## Notes

- Nav: active-state desktop bar + full-screen mobile drawer
- Live elements: ET clock and next-session countdown computed from the real timetable
- Data layer: `lib/data.ts` (shared facts) + `lib/pages.ts` (per-page content, regenerable via the v2-page-content workflow)
- Snapshot rig: `node snapshots/shoot.mjs` against a prod server on :3101
- Deploy: drops onto Vercel as-is (all static)
