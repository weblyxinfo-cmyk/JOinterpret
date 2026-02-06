import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C6A336",
        "gold-dark": "#A3852B",
        cream: "#F2EDE4",
        "cream-dark": "#E8E0D2",
        dark: "#1A1A1A",
        black: "#111111",
        white: "#FEFCF9",
        gray: {
          DEFAULT: "#666666",
          light: "#999999",
        },
      },
      fontFamily: {
        heading: ["var(--font-unbounded)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      animation: {
        ticker: "ticker 25s linear infinite",
        "ticker-slow": "ticker 30s linear infinite",
        spin: "spin 20s linear infinite",
        pulse: "pulse 2s infinite",
      },
      keyframes: {
        ticker: {
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
