"use client";

import { useEffect, useState } from "react";
import { SCHEDULE, DAYS, type ScheduleItem } from "@/lib/data";

/** Live "next session" computed from the real timetable, in gym time (ET). */
export type NextClass = {
  item: ScheduleItem;
  dayLabel: string;
  isToday: boolean;
  startsInMin: number;
  clock: string;
};

const fmt = (h: number) => {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  const ampm = hh >= 12 ? "PM" : "AM";
  const h12 = ((hh + 11) % 12) + 1;
  return `${h12}:${mm.toString().padStart(2, "0")}${ampm}`;
};

const etNow = () => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour12: false,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const dayMap: Record<string, number> = {
    Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6,
  };
  const day = dayMap[get("weekday")] ?? 0;
  const hour =
    parseInt(get("hour"), 10) % 24 +
    parseInt(get("minute"), 10) / 60 +
    parseInt(get("second"), 10) / 3600;
  return { day, hour };
};

const PUBLIC = SCHEDULE.filter(
  (s) => s.cat !== "pro" && s.cat !== "private"
).sort((a, b) => a.day - b.day || a.start - b.start);

export function findNext(): NextClass | null {
  const { day, hour } = etNow();
  for (let offset = 0; offset < 8; offset++) {
    const d = (day + offset) % 7;
    const todays = PUBLIC.filter((s) => s.day === d);
    for (const item of todays) {
      if (offset === 0 && item.start <= hour) continue;
      const startsInMin = Math.round(
        (offset * 24 + item.start - hour) * 60
      );
      return {
        item,
        dayLabel: offset === 0 ? "TODAY" : offset === 1 ? "TOMORROW" : DAYS[d],
        isToday: offset === 0,
        startsInMin,
        clock: fmt(item.start),
      };
    }
  }
  return null;
}

export function useNextClass(): NextClass | null {
  const [next, setNext] = useState<NextClass | null>(null);
  useEffect(() => {
    setNext(findNext());
    const t = setInterval(() => setNext(findNext()), 30_000);
    return () => clearInterval(t);
  }, []);
  return next;
}

export function useEtClock(): string {
  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () =>
      setClock(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return clock;
}
