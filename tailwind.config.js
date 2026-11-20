/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF8F5",
        ink: "#1C1917",
        muted: "#6B6660",
        line: "#E6E0D8",
        dark: "#151311",
        darksoft: "#1E1B18",
        drift: "#B88A5A",
        accent: "#B4552D",
        accentsoft: "#E7DED2",
      },
      fontFamily: {
        serif: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        caretBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s ease-out both",
        float: "float 8s ease-in-out infinite",
        caretBlink: "caretBlink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
