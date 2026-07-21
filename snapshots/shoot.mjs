// Snapshot rig — real-clock Playwright captures of every act.
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";

const BASE = "http://127.0.0.1:3100";
const OUT = fileURLToPath(new URL(".", import.meta.url));

const SHOTS = [
  { name: "01-hero", at: null, w: 1600, h: 900 },
  { name: "02-fighter-deconstructed", at: "system", w: 1600, h: 900 },
  { name: "03-modules", at: "modules", w: 1600, h: 900 },
  { name: "04-schedule-engine", at: "schedule", w: 1600, h: 1100 },
  { name: "05-lineage", at: "lineage", w: 1600, h: 900 },
  { name: "06-proof", at: "proof", w: 1600, h: 900 },
  { name: "07-access-rates", at: "access", w: 1600, h: 900 },
  { name: "08-mobile-hero", at: null, w: 390, h: 844 },
];

const browser = await chromium.launch();
for (const s of SHOTS) {
  const page = await browser.newPage({
    viewport: { width: s.w, height: s.h },
    deviceScaleFactor: 1.5,
  });
  await page.goto(`${BASE}/?native=1&noboot=1`, { waitUntil: "networkidle" });
  if (s.at) {
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      const r = el.getBoundingClientRect();
      window.scrollTo(
        0,
        Math.max(0, r.top + window.scrollY + r.height / 2 - innerHeight / 2)
      );
    }, s.at);
  }
  await page.waitForTimeout(3500); // let reveals settle at 60fps
  await page.screenshot({ path: `${OUT}${s.name}.png` });
  console.log("shot", s.name);
  await page.close();
}
await browser.close();
