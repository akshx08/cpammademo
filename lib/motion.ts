// House motion values — HOUSE-STYLE.md
export const EASE_HOUSE = [0.22, 1, 0.36, 1] as const;
export const EASE_DRAWER = [0.4, 0, 0.2, 1] as const;

export const VIEW = { once: true, margin: "-15%" } as const;

export const fadeUp = (delay = 0, dist = 28) => ({
  initial: { opacity: 0, y: dist },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEW,
  transition: { duration: 0.85, ease: EASE_HOUSE, delay },
});

export const fade = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: VIEW,
  transition: { duration: 1.05, ease: EASE_HOUSE, delay },
});

/** stagger helpers: words i*0.06, cards i*0.12 */
export const wordDelay = (i: number) => i * 0.06;
export const cardDelay = (i: number) => i * 0.12;
