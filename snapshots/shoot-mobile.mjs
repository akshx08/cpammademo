import { chromium } from "playwright";
const BASE = "http://127.0.0.1:3100";
const OUT = "/Users/akshgarg/Desktop/claud work/website demos/cpammademov1/snapshots/";
const SHOTS = [
  { name: "m1-fighter", at: "system" },
  { name: "m2-module", at: "modules" },
  { name: "m3-schedule", at: "schedule" },
  { name: "m4-rates", at: "access" },
];
const browser = await chromium.launch();
for (const s of SHOTS) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(`${BASE}/?noboot=1`, { waitUntil: "networkidle" });
  await page.evaluate((id) => {
    const el = document.getElementById(id);
    const r = el.getBoundingClientRect();
    window.scrollTo(0, Math.max(0, r.top + window.scrollY + (id==="modules"||id==="access" ? 300 : r.height/2 - innerHeight/2)));
  }, s.at);
  await page.waitForTimeout(3200);
  await page.screenshot({ path: `${OUT}${s.name}.png` });
  console.log("shot", s.name);
  await page.close();
}
await browser.close();
