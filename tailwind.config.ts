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
        background: "var(--background)",
        foreground: "var(--foreground)",
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          glow: "#00f5c8",
        },
        navy: {
          950: "#030712",
          900: "#060d1f",
          850: "#08112b",
          800: "#0b1739",
        },
        accent: {
          teal: "#00f5c8",
          blue: "#1a56ff",
          purple: "#8b5cf6",
          coral: "#ff4d6d",
          gold: "#f59e0b",
        },
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        cabinet: ["var(--font-cabinet)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 4s ease-in-out infinite",
        "marquee": "marquee 25s linear infinite",
        "shine": "shine 2s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 15px rgba(0, 245, 200, 0.6))" },
          "50%": { opacity: "0.6", filter: "drop-shadow(0 0 5px rgba(0, 245, 200, 0.2))" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
