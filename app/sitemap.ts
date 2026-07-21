import type { MetadataRoute } from "next";
import { PROGRAM_PAGES } from "@/lib/pages";

const BASE = "https://cpammademo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = [
    "",
    "/programs",
    "/schedule",
    "/instructors",
    "/fighters",
    "/rates",
    "/about",
    "/faq",
    "/psu",
    "/contact",
  ].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const programs = PROGRAM_PAGES.map((p) => ({
    url: `${BASE}/programs/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...statics, ...programs];
}
