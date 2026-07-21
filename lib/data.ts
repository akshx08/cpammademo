/**
 * CPAMMA content — every fact sourced from cpamma.com (crawled 2026-07-20).
 * This file is the single tuning surface for the whole site.
 */

export const GYM = {
  name: "CPAMMA",
  fullName: "Central PA Mixed Martial Arts",
  tagline: "STRIKING.GRAPPLING.WEAPONS",
  address: "1445 West College Ave, State College, PA 16801",
  addressNote: "On PSU campus, behind the IST Building · CATA bus stop out front · free parking",
  coords: "40.79°N 77.86°W",
  phone: "814-422-KICK",
  email: "info@cpamma.com",
  instagram: "https://www.instagram.com/centralpamma",
  facebook: "https://www.facebook.com/cpamma",
  inquire: "https://www.cpamma.com/inquire",
  hours: [
    { day: "MON", value: "11:40–13:00 · 16:30–22:00" },
    { day: "TUE", value: "11:40–13:00 · 16:30–22:00" },
    { day: "WED", value: "11:40–13:00 · 16:30–22:00" },
    { day: "THU", value: "11:40–13:00 · 16:30–22:00" },
    { day: "FRI", value: "16:30–18:30" },
    { day: "SAT", value: "11:40–15:00" },
    { day: "SUN", value: "14:00–15:00" },
  ],
};

export const HERO_STATS = [
  { k: "TRAINING WINDOW", v: "70+ HRS / WK" },
  { k: "STARTUP FEE", v: "$0" },
  { k: "GOOGLE REVIEWS", v: "500+ ★ FIVE-STAR" },
  { k: "FACILITY", v: "10,000 SQ FT" },
  { k: "OFFER", v: "UP TO 1 MONTH FREE" },
];

/** The fighter, deconstructed — annotation constellation nodes (viewBox 0 0 100 130) */
export const FIGHTER_SYSTEMS = [
  {
    id: "mind",
    label: "MIND",
    spec: "discipline · composure · focus",
    at: { x: 40, y: 16 },
    side: "left" as const,
  },
  {
    id: "striking",
    label: "STRIKING SYSTEM",
    spec: "Muay Thai · Boxing · 8 limbs",
    at: { x: 25, y: 28 },
    side: "left" as const,
  },
  {
    id: "guard",
    label: "GUARD",
    spec: "reality-based defense · weapons",
    at: { x: 38, y: 32 },
    side: "right" as const,
  },
  {
    id: "engine",
    label: "ENGINE",
    spec: "cardio · conditioning · fight-ready",
    at: { x: 45, y: 40 },
    side: "right" as const,
  },
  {
    id: "base",
    label: "GRAPPLING BASE",
    spec: "BJJ · wrestling · leverage",
    at: { x: 48, y: 58 },
    side: "left" as const,
  },
  {
    id: "footwork",
    label: "FOOTWORK",
    spec: "stance · angles · balance",
    at: { x: 29, y: 111 },
    side: "right" as const,
  },
];

export type ClassCat =
  | "bjj"
  | "striking"
  | "mma"
  | "youth"
  | "rbmma"
  | "open"
  | "pro"
  | "private";

export const CAT_META: Record<ClassCat, { label: string; style: string }> = {
  bjj: { label: "GRAPPLING", style: "solid" },
  striking: { label: "STRIKING", style: "outline" },
  mma: { label: "MMA / SPARRING", style: "stripe" },
  youth: { label: "YOUTH / TEEN", style: "dim-solid" },
  rbmma: { label: "REALITY BASED", style: "dashed" },
  open: { label: "OPEN MAT", style: "faint" },
  pro: { label: "PRO (INVITE)", style: "pro" },
  private: { label: "PRIVATES", style: "faint" },
};

export type ScheduleItem = {
  day: number; // 0 = Mon … 6 = Sun
  start: number; // decimal hours, 24h
  end: number;
  name: string;
  cat: ClassCat;
  note?: string;
};

const MON: ScheduleItem[] = [
  { day: 0, start: 7, end: 8, name: "Striking — Muay Thai · Boxing", cat: "striking" },
  { day: 0, start: 10, end: 11, name: "Pro Practice", cat: "pro", note: "invite only" },
  { day: 0, start: 11.67, end: 12.67, name: "Gi Grappling — BJJ", cat: "bjj" },
  { day: 0, start: 12.67, end: 13, name: "After-Class Rolling", cat: "open" },
  { day: 0, start: 13, end: 15, name: "Private Lessons", cat: "private" },
  { day: 0, start: 16.5, end: 17.25, name: "Youth Martial Arts", cat: "youth" },
  { day: 0, start: 17.25, end: 18.25, name: "Teen Gi Grappling", cat: "youth" },
  { day: 0, start: 17.5, end: 18.5, name: "Women's Kickboxing", cat: "striking", note: "women only" },
  { day: 0, start: 18.5, end: 19.25, name: "Youth Martial Arts", cat: "youth" },
  { day: 0, start: 19.25, end: 20, name: "No-Gi Grappling — Catch · BJJ", cat: "bjj" },
  { day: 0, start: 19.5, end: 20.5, name: "Sparring — MMA · Striking", cat: "mma" },
  { day: 0, start: 20, end: 21, name: "Striking — Muay Thai · Boxing", cat: "striking" },
  { day: 0, start: 21, end: 22, name: "Gi Grappling — BJJ", cat: "bjj" },
];

const TUE: ScheduleItem[] = [
  { day: 1, start: 7, end: 8, name: "Gi Grappling — BJJ", cat: "bjj" },
  { day: 1, start: 10, end: 11, name: "Pro Practice", cat: "pro", note: "invite only" },
  { day: 1, start: 10.75, end: 11.67, name: "No-Gi Rolling — Catch · BJJ", cat: "bjj" },
  { day: 1, start: 11.67, end: 12.67, name: "Striking + Fight Team Sparring", cat: "mma" },
  { day: 1, start: 13, end: 15, name: "Private Lessons", cat: "private" },
  { day: 1, start: 16.5, end: 17.25, name: "Youth Martial Arts", cat: "youth" },
  { day: 1, start: 17.5, end: 18.5, name: "Reality Based MMA — Weapons", cat: "rbmma" },
  { day: 1, start: 17.5, end: 18.25, name: "Youth Martial Arts — Spillover", cat: "youth" },
  { day: 1, start: 18.5, end: 20, name: "Gi Grappling — BJJ (90 min)", cat: "bjj" },
  { day: 1, start: 20, end: 21, name: "Teen Striking — Muay Thai · Boxing", cat: "youth" },
  { day: 1, start: 20, end: 22, name: "After-Class Rolling — Gi · No-Gi · MMA", cat: "open" },
  { day: 1, start: 21, end: 22, name: "Striking — Muay Thai · Boxing", cat: "striking" },
];

const shift = (items: ScheduleItem[], day: number): ScheduleItem[] =>
  items.map((i) => ({ ...i, day }));

export const SCHEDULE: ScheduleItem[] = [
  ...MON,
  ...TUE,
  ...shift(MON, 2),
  ...shift(TUE, 3),
  // Friday
  { day: 4, start: 10, end: 11, name: "Pro Practice", cat: "pro", note: "invite only" },
  { day: 4, start: 16.5, end: 17.25, name: "Youth Martial Arts", cat: "youth" },
  { day: 4, start: 17.5, end: 18.5, name: "Adult Open Mat", cat: "open" },
  { day: 4, start: 17.5, end: 18.5, name: "Women's-Only BJJ", cat: "bjj", note: "women only" },
  // Saturday
  { day: 5, start: 10, end: 11, name: "Pro Practice", cat: "pro", note: "invite only" },
  { day: 5, start: 11.67, end: 12.67, name: "No-Gi Grappling", cat: "bjj" },
  { day: 5, start: 13, end: 13.75, name: "Youth Martial Arts", cat: "youth" },
  { day: 5, start: 14, end: 15, name: "Adult / Teen Open Mat", cat: "open" },
  // Sunday
  { day: 6, start: 10, end: 11, name: "Pro Practice", cat: "pro", note: "invite only" },
  { day: 6, start: 14, end: 15, name: "Adult / Teen Open Mat", cat: "open" },
];

export const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export type Module = {
  id: string;
  tag: string;
  system: string;
  name: string;
  price: string;
  copy: string[];
  bullets: string[];
  img: string;
  alt: string;
};

export const MODULES: Module[] = [
  {
    id: "bjj",
    tag: "MODULE 01",
    system: "GROUND SYSTEM",
    name: "Brazilian Jiu-Jitsu",
    price: "AS LOW AS $3/DAY",
    copy: [
      "Control and subdue a larger, stronger opponent through superior technique, leverage, and body mechanics. Gi and No-Gi, taught by black belts at every all-levels class.",
      "Takedowns, pin escapes, sweeps, chokes, joint locks — trained with progressive resistance in a relaxed, friendly room. Self-defense, competition, or just for fun.",
    ],
    bullets: [
      "Black belts teach every all-levels class",
      "Gi · No-Gi · Catch wrestling lineage",
      "Largest female training group in Central PA",
      "200+ team medals in the last 4 years",
    ],
    img: "/media/BJJ-Anthony-Shin-Guard.jpg",
    alt: "BJJ shin-guard position at CPAMMA",
  },
  {
    id: "striking",
    tag: "MODULE 02",
    system: "STAND-UP SYSTEM",
    name: "Muay Thai & Boxing",
    price: "AS LOW AS $3/DAY",
    copy: [
      "The art and science of eight limbs. Thai training methods develop devastating power, insurmountable speed, and superb cardiovascular endurance.",
      "Classes run 30 minutes of technique and drilling under certified Muay Thai instructors, then 30 minutes of high-intensity rounds — Thai pads, heavy bags, sparring.",
    ],
    bullets: [
      "10+ Muay Thai titles won by CPAMMA students",
      "Certified instructors under Ajarn Chai Sirisute",
      "Boxing-only track available",
      "Co-ed room, roughly 60/40 split",
    ],
    img: "/media/MT-Melissa-Hitting-Bag.jpg",
    alt: "Heavy bag rounds in the CPAMMA ring",
  },
  {
    id: "mma",
    tag: "MODULE 03",
    system: "COMPLETE SYSTEM",
    name: "Mixed Martial Arts",
    price: "AS LOW AS $5/DAY",
    copy: [
      "Boxing, Muay Thai, Brazilian Jiu-Jitsu, and Wrestling — the four elements of modern MMA, each taught by an instructor who specializes in that discipline.",
      "No jack-of-all-trades classes. You train each skill set at full depth, then assemble them in sparring. Fighters from this room have reached the UFC, Bellator, Strikeforce, and Invicta.",
    ],
    bullets: [
      "Four disciplines, four specialist instructors",
      "Full-size boxing ring and octagon in-house",
      "Fight team sparring 6 days a week",
      "20+ years building pro fighters",
    ],
    img: "/media/MMA-Dan-Cage.jpg",
    alt: "MMA bout in the cage",
  },
  {
    id: "youth",
    tag: "MODULE 04",
    system: "DEVELOPMENT SYSTEM",
    name: "Youth Martial Arts",
    price: "FROM $109/MO · $0 INITIATION",
    copy: [
      "The largest, longest-running youth program in the area — 200+ kids, ages 5 through teens, across three time slots a day.",
      "BJJ, Muay Thai & Boxing, Jeet Kune Do, and Filipino Martial Arts inside a character development program: confidence, discipline, focus, respect, perseverance. Techniques are tools, not weapons.",
    ],
    bullets: [
      "200+ children — biggest program in the area",
      "Merit Badge character program",
      "Belt ranking through to youth black belt",
      "Certified black belt instructor every week",
    ],
    img: "/media/YMA-Mighty-Mites-Looking-Back.jpg",
    alt: "Youth martial arts class lined up on the mats",
  },
  {
    id: "wkb",
    tag: "MODULE 05",
    system: "WOMEN'S SYSTEM",
    name: "Women's Kickboxing",
    price: "AS LOW AS $3/DAY",
    copy: [
      "The exact same striking curriculum, women only — taught by multiple-time female world champions in an upbeat, laid-back room.",
      "Technique instruction, intense kickboxing drills, high-cardio partner rounds, and floor conditioning. Built to burn, built to last.",
    ],
    bullets: [
      "Taught by 10x champion Elise Pone's team",
      "Women-only room, all levels",
      "Competitive track available",
      "Largest female training group in the region",
    ],
    img: "/media/MT-Ashlyn-Holding-Pads-and-Kicking.jpg",
    alt: "Pad rounds in women's kickboxing",
  },
  {
    id: "rbmma",
    tag: "MODULE 06",
    system: "SURVIVAL SYSTEM",
    name: "Reality Based MMA",
    price: "AS LOW AS $3/DAY",
    copy: [
      "Fighting when there are no rules — multiple attackers, weapons, no weight classes. Stick, knife, and empty hand under the Inosanto lineage.",
      "Taught by Guro Ryan 'Guard Dog' Gruhn — Full Dog Brother, 30+ real-contact stick fights. 30 minutes of instruction, 15 minutes of sparring, every class.",
    ],
    bullets: [
      "Filipino Martial Arts — Kali · Escrima · Silat",
      "Inosanto lineage, Dog Brothers method",
      "Stick sparring from day one (with approval)",
      "Everyone trains with everyone — no weight classes",
    ],
    img: "/media/RBMMA-Seth.jpg",
    alt: "Reality Based MMA stick work",
  },
];

export type Person = {
  name: string;
  nick?: string;
  role: string;
  creds: string[];
  img?: string;
};

export const INSTRUCTORS: Person[] = [
  {
    name: "Ryan Gruhn",
    nick: "Guard Dog",
    role: "Head Instructor",
    creds: [
      "BJJ 3° Black Belt · 2x Black Belt Champion",
      "Ajarn — Muay Thai Black Arm Band",
      "Guro, Dog Brothers · 30+ stick fights",
      "Coaching record 215–55–4 · 34 belts",
    ],
    img: "/media/Ryan-CSW.jpg",
  },
  {
    name: "Elise Pone",
    nick: "The Piece",
    role: "Fight Team Captain",
    creds: [
      "10x Muay Thai Champion (5x World)",
      "Undefeated Pro MMA — Invicta FC",
      "BJJ Black Belt · Khun Kru",
      "30+ fights, pro MMA & Muay Thai",
    ],
    img: "/media/Elise-Belts.jpg",
  },
  {
    name: "Seth Canner",
    role: "Brazilian Jiu-Jitsu",
    creds: [
      "BJJ 2° Black Belt",
      "2x BJJ Brown Belt Champion",
      "Brown Dog Tag — Dog Brothers",
    ],
    img: "/media/DSC09359.jpg",
  },
  {
    name: "Joe Clark",
    nick: "Singto",
    role: "Muay Thai",
    creds: [
      "Muay Thai Black Arm Band",
      "4x Muay Thai Champion (ToC, WORLD)",
      "20+ fights",
    ],
    img: "/media/203382856_4431921930191907_1678215955574488244_n.jpg",
  },
  {
    name: "Kellie Marin",
    nick: "Squirrel",
    role: "Muay Thai",
    creds: [
      "Muay Thai Black Arm Band",
      "Invicta FC veteran · 15+ fights",
      "2x Muay Thai Champion (GFC, ToC)",
    ],
    img: "/media/248711047_10165749036055445_2195705408397520867_n.jpg",
  },
  {
    name: "Ashlyn Boehr",
    role: "Youth Director · Striking",
    creds: [
      "Muay Thai Champion (ToC) · GFC veteran",
      "Muay Thai Red Arm Band",
      "BJJ Purple Belt",
    ],
    img: "/media/Ashlyn.jpg",
  },
  {
    name: "Roy Schaeffer",
    role: "Teen Jiu-Jitsu",
    creds: ["BJJ Brown Belt", "12+ years on the mats"],
    img: "/media/Roy.jpg",
  },
  {
    name: "Nicole Good",
    role: "Cardio Conditioning",
    creds: [
      "10+ Muay Thai fights (7–3)",
      "BJJ Purple Belt · Purple Arm Band",
      "Runs fight-team weight cuts",
    ],
    img: "/media/Nikki.jpg",
  },
  {
    name: "Joaquin Alvarez",
    role: "Muay Thai · Grappling",
    creds: ["3x GFC veteran", "Red Arm Band · BJJ Brown Belt"],
    img: "/media/Joaquin.jpg",
  },
  {
    name: "Matt Knepp",
    role: "Muay Thai",
    creds: [
      "Black & Red Arm Band",
      "National & international fighter",
      "U.S. Marine veteran · 15+ years",
    ],
    img: "/media/Matt-e1727619335188.jpg",
  },
  {
    name: "Jill Fremberg",
    role: "Muay Thai",
    creds: ["Red Arm Band", "4 Muay Thai matches"],
    img: "/media/Jill.jpg",
  },
  {
    name: "Wilson Diaz",
    role: "Grappling",
    creds: ["BJJ Purple Belt", "Longtime wrestling coach"],
    img: "/media/Wilson.jpg",
  },
];

/** Lineage constellation — three roots converge on CPAMMA */
export const LINEAGE = {
  roots: [
    {
      id: "chai",
      name: "Ajarn Chai Sirisute",
      org: "Thai Boxing Assoc. of the USA",
      art: "MUAY THAI",
    },
    {
      id: "paulson",
      name: "Erik Paulson",
      org: "CSW — Catch/Shoot Wrestling",
      art: "GRAPPLING",
    },
    {
      id: "inosanto",
      name: "Guro Dan Inosanto",
      org: "Inosanto Academy → Marc Denny, Dog Brothers",
      art: "WEAPONS / FMA",
    },
  ],
  center: { name: "RYAN 'GUARD DOG' GRUHN", sub: "CPAMMA · State College" },
  leaves: [
    "Elise Pone — BJJ Black · Khun Kru",
    "Seth Canner — BJJ 2° Black",
    "Joe Clark — Black Arm Band",
    "Kellie Marin — Black Arm Band",
    "Matt Knepp — Black & Red Arm Band",
  ],
};

export const FIGHTERS = [
  { name: "Elise 'Piece' Pone", disc: "MMA · Muay Thai", record: "14–1", note: "5x Muay Thai Champion · undefeated pro MMA", img: "/media/Elise-TBA-Title.jpeg" },
  { name: "Tyler 'Deep' Fry", disc: "MMA · Muay Thai", record: "11–4", note: "4x Champion — USKA · ISKA · WORLD · ToC", img: "/media/Tyler.jpg" },
  { name: "Joe 'Singto' Clark", disc: "Muay Thai", record: "10–4", note: "4x Champion — WORLD · ToC", img: "/media/Joe-Clark.jpg" },
  { name: "Dan O'Neill", disc: "Muay Thai · MMA", record: "9–2", note: "", img: "/media/Dan-e1635089580454.jpg" },
  { name: "Alex Woskob", disc: "Boxing · Muay Thai", record: "9–3", note: "3x Golden Gloves Champion", img: "/media/Woskob-e1635117763175.jpg" },
  { name: "Kellie Marin", disc: "Muay Thai", record: "7–3", note: "Invicta FC veteran", img: "/media/248711047_10165749036055445_2195705408397520867_n.jpg" },
  { name: "Nicole Good", disc: "Muay Thai", record: "6–4", note: "1x Kickboxing Champion", img: "/media/Nikki.jpg" },
  { name: "Anthony Ducato", disc: "MMA · Muay Thai", record: "5–3", note: "", img: "/media/Anthony-1.jpg" },
];

export const REVIEWS = [
  {
    quote:
      "This gym has been my home for years — excellent teaching, great atmosphere, competitive AND chill. After trying gyms in Colorado, I realized just how lucky I was to train here.",
    name: "Joel Armstrong",
  },
  {
    quote:
      "Everyone is treated with equal respect regardless of age, rank, size, or gender. I competed for the first time a little over 2 months after I joined.",
    name: "Jill Danko",
  },
  {
    quote:
      "Starting BJJ at 39 years old was very daunting — the only daunting part was stepping in the gym. It may be 20 people in a class, but it feels like a one-on-one lesson every time.",
    name: "Andy Alvarez",
  },
  {
    quote:
      "Beyond expectations! Without question or hesitation, the best school around. The quality of instruction is only matched by the quality of character of the instructors.",
    name: "Jean Cano",
  },
  {
    quote:
      "My wife and I trained here on vacation from Arizona. We felt welcomed the moment we stepped onto the mats. We will definitely be back.",
    name: "Terry",
  },
  {
    quote:
      "The staff genuinely care about your growth. No intimidation — just hard work, learning, self-improvement, and a lot of fun.",
    name: "Max Stanley",
  },
  {
    quote:
      "My son and I have been doing BJJ here for a few years now. Rolling with my son has been a great joy — thanks CPAMMA!",
    name: "James Shin",
  },
  {
    quote:
      "Clean, well equipped, lots of mat space, and a diverse range of age and gender. Fantastic rolls with everyone I worked with.",
    name: "Cari Jacobs",
  },
];

export const PRO_QUOTE = {
  quote:
    "I've had a very great experience with this gym. The teachers are very friendly, easy to talk to and ask questions.",
  name: "Ed Ruth",
  cred: "3x NCAA Wrestling Champion · Bellator",
};

export const RATES = [
  {
    id: "psu",
    name: "PSU STUDENT",
    price: 99,
    per: "/mo",
    tag: "NEW MEMBERS · SHOW PSU ID",
    features: [
      "Up to 1 month free",
      "Half off the standard rate + $10 PSU discount",
      "Unlimited classes in 1 program",
      "As little as $1 per class",
      "No contracts · $0 startup · $0 cancellation",
    ],
    featured: false,
  },
  {
    id: "half",
    name: "1/2 OFF SPECIAL",
    price: 109,
    per: "/mo",
    tag: "NEW MEMBERS · STANDARD $219",
    features: [
      "Up to 1 month free (adults)",
      "Half off the standard rate — locked in",
      "Unlimited classes in 1 program",
      "Youth: 2 classes per week",
      "No contracts · $0 startup · $0 cancellation",
    ],
    featured: true,
  },
  {
    id: "all",
    name: "ALL ACCESS",
    price: 159,
    per: "/mo",
    tag: "NEW MEMBERS · ADULTS",
    features: [
      "Up to 1 month free",
      "Unlimited classes in 3 programs",
      "Full run of the 70-hour week",
      "Online University included",
      "No contracts · $0 startup · $0 cancellation",
    ],
    featured: false,
  },
];

export const RATE_FOOTNOTES = [
  "Month-to-month · minimum two full paying months · 31-day written notice to cancel",
  "Rate locks in for as long as you stay a member",
  "First class always free — visitors from out of town train free the first time (email ahead)",
  "LEO train free via Adopt-a-Cop Centre County",
];

export const ABOUT_FACTS = [
  { v: "10,000", k: "SQ FT FACILITY" },
  { v: "70+", k: "TRAINING HRS / WK" },
  { v: "15+", k: "CERTIFIED INSTRUCTORS" },
  { v: "500+", k: "FIVE-STAR REVIEWS" },
  { v: "400+", k: "PSU STUDENTS TRAINING" },
  { v: "200+", k: "TEAM MEDALS IN 4 YRS" },
  { v: "34", k: "CHAMPIONSHIP BELTS CORNERED" },
  { v: "20+", k: "YEARS BUILDING FIGHTERS" },
];
