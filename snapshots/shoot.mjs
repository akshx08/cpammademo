// v2 snapshot rig — one shot per route + mobile home + open mobile menu
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";

const BASE = "http://127.0.0.1:3101";
const OUT = fileURLToPath(new URL(".", import.meta.url));

const SHOTS = [
  { name: "v2-01-home", path: "/?noboot=1", w: 1600, h: 900 },
  { name: "v2-02-programs", path: "/programs", w: 1600, h: 1000 },
  { name: "v2-03-program-bjj", path: "/programs/brazilian-jiu-jitsu", w: 1600, h: 1000 },
  { name: "v2-04-schedule", path: "/schedule", w: 1600, h: 1100 },
  { name: "v2-05-instructors", path: "/instructors", w: 1600, h: 1000 },
  { name: "v2-06-rates", path: "/rates", w: 1600, h: 1050 },
  { name: "v2-07-faq", path: "/faq", w: 1600, h: 1000 },
  { name: "v2-08-contact", path: "/contact", w: 1600, h: 1050 },
  { name: "v2-09-mobile-home", path: "/?noboot=1", w: 390, h: 844, mobile: true },
  { name: "v2-10-mobile-menu", path: "/programs", w: 390, h: 844, mobile: true, menu: true },
];

const browser = await chromium.launch();
for (const s of SHOTS) {
  const page = await browser.newPage({
    viewport: { width: s.w, height: s.h },
    deviceScaleFactor: 1.5,
    ...(s.mobile ? { isMobile: true, hasTouch: true } : {}),
  });
  await page.goto(`${BASE}${s.path}`, { waitUntil: "networkidle" });
  if (s.menu) {
    await page.click('button[aria-label="Open menu"]');
  }
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${OUT}${s.name}.png` });
  console.log("shot", s.name);
  await page.close();
}
await browser.close();
