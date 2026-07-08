import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1320px" },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        "surface-2": "hsl(var(--surface-2))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--crimson))",
          foreground: "hsl(var(--crimson-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--indigo))",
          foreground: "hsl(var(--indigo-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--marigold))",
          foreground: "hsl(var(--marigold-foreground))",
        },
        pine: {
          DEFAULT: "hsl(var(--pine))",
          foreground: "hsl(var(--pine-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        flag: {
          blue: "#1C3FAA",
          white: "#F5F3EC",
          red: "#C8102E",
          green: "#2F6B4F",
          yellow: "#F4A522",
        },
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.25rem",
      },
      boxShadow: {
        soft: "0 2px 10px -2px rgb(0 0 0 / 0.06), 0 8px 30px -8px rgb(0 0 0 / 0.10)",
        lift: "0 8px 24px -6px rgb(0 0 0 / 0.12), 0 20px 48px -12px rgb(0 0 0 / 0.18)",
        glow: "0 0 0 1px hsl(var(--marigold) / 0.25), 0 12px 40px -8px hsl(var(--crimson) / 0.35)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(120% 120% at 15% 0%, hsl(var(--indigo) / 0.95) 0%, hsl(var(--indigo)) 38%, hsl(220 45% 8%) 78%)",
        "flag-strip":
          "repeating-linear-gradient(90deg, #1C3FAA 0 10%, #F5F3EC 10% 12%, #C8102E 12% 22%, #F5F3EC 22% 24%, #2F6B4F 24% 34%, #F5F3EC 34% 36%, #F4A522 36% 46%, #F5F3EC 46% 48%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flutter: {
          "0%, 100%": { transform: "skewX(0deg)" },
          "50%": { transform: "skewX(-2deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        flutter: "flutter 3.5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
