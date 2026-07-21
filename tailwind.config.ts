import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#060507",
        panel: "#0D0C10",
        bone: "#F4F1EC",
        steel: "#8B8F98",
        blood: "#FF3B2F",
        ember: "#B3221A",
      },
      fontFamily: {
        display: ["var(--font-anton)"],
        hud: ["var(--font-rajdhani)"],
        mono: ["var(--font-jetbrains)"],
        body: ["var(--font-inter)"],
      },
      transitionTimingFunction: {
        house: "cubic-bezier(0.22, 1, 0.36, 1)",
        drawer: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      letterSpacing: {
        hud: "0.18em",
        tag: "0.32em",
      },
    },
  },
  plugins: [],
};
export default config;
