import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        cream: {
          50: "#FFFDF9",
          100: "#FFF8EF",
          200: "#FBEEDC",
          300: "#F6E1C5",
          400: "#EFD0A8",
        },
        saffron: {
          50: "#FFF7EA",
          100: "#FEEBC6",
          200: "#FCD78D",
          300: "#F9BE54",
          400: "#F4A52C",
          500: "#E8890B",
          600: "#C96E06",
          700: "#A4540A",
          800: "#85420F",
          900: "#6E3710",
        },
        chili: {
          50: "#FDF4F2",
          100: "#FCE3DD",
          200: "#F6C3B6",
          300: "#EE9A85",
          400: "#E26B4F",
          500: "#D4492A",
          600: "#B8331A",
          700: "#992617",
          800: "#7E2118",
          900: "#6A2018",
        },
        masala: {
          50: "#FAF6F2",
          100: "#F1E9E1",
          200: "#E0D1C2",
          300: "#C9B19C",
          400: "#A98A6E",
          500: "#8A6A4F",
          600: "#6E523C",
          700: "#574030",
          800: "#3A2A1F",
          900: "#241910",
          950: "#160F09",
        },
        leaf: {
          100: "#E3F2DE",
          400: "#5BB364",
          500: "#3F9E4D",
          600: "#2F7E3C",
          700: "#256531",
        },
        gold: {
          400: "#E9C46A",
          500: "#D9A441",
          600: "#B7822A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        hindi: ["var(--font-hindi)", "serif"],
        "hindi-sans": ["var(--font-hindi-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(36,25,16,0.08), 0 8px 24px -8px rgba(36,25,16,0.12)",
        warm: "0 10px 40px -12px rgba(184,51,26,0.28)",
        glow: "0 0 0 1px rgba(244,165,44,0.25), 0 18px 50px -16px rgba(232,137,11,0.45)",
        card: "0 1px 2px rgba(36,25,16,0.06), 0 14px 40px -18px rgba(36,25,16,0.25)",
      },
      backgroundImage: {
        "hero-grain":
          "radial-gradient(circle at 20% 20%, rgba(244,165,44,0.18), transparent 42%), radial-gradient(circle at 82% 12%, rgba(212,73,42,0.16), transparent 40%), radial-gradient(circle at 50% 90%, rgba(217,164,65,0.16), transparent 45%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        steam: {
          "0%": { opacity: "0", transform: "translateY(0) scaleX(1)" },
          "40%": { opacity: "0.5" },
          "100%": { opacity: "0", transform: "translateY(-22px) scaleX(1.4)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
        steam: "steam 2.6s ease-out infinite",
        marquee: "marquee 28s linear infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
