import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#040705",
        foreground: "#f0fdf4",
        tech: {
          dark: "#040705",
          card: "#0a120c",
          cardHover: "#101e14",
          border: "#162b1c",
          borderGlow: "#22472d",
          blue: "#10b981", // Emerald accent
          purple: "#34d399", // Mint accent
          cyan: "#059669",
          emerald: "#10b981",
          mint: "#34d399",
          textMuted: "#94a3b8"
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
      },
      backgroundImage: {
        'tech-glow': 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.15), rgba(52, 211, 153, 0.05), transparent 70%)',
        'tech-grid': 'radial-gradient(rgba(16, 185, 129, 0.12) 1px, transparent 1px)',
      },
      boxShadow: {
        'emerald-glow': '0 0 25px rgba(16, 185, 129, 0.25)',
      }
    },
  },
  plugins: [],
};

export default config;
