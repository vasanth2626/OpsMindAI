// client/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      /* ✅ DARK SAAS COLOR SYSTEM */
      colors: {
        background: "#0B1120",        // main dark navy
        surface: "#0F172A",           // sidebar
        card: "#111827",              // cards
        cardHover: "#1F2937",
        borderSubtle: "#1E293B",
        muted: "#94A3B8",
        primary: {
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
        },
        accent: "#06B6D4",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },

      /* ✅ FONT */
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },

      /* ✅ RADIUS */
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },

      /* ✅ SHADOWS */
      boxShadow: {
        card: "0 8px 30px rgba(0,0,0,0.4)",
        glow: "0 0 25px rgba(59,130,246,0.35)",
      },

      /* ✅ GRADIENTS */
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(to right, #06B6D4, #3B82F6)",
        "card-gradient":
          "linear-gradient(145deg, #111827, #0F172A)",
      },
    },
  },
  plugins: [],
};