/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary_100: "var(--primary_100)",
        primary_200: "var(--primary_200)",
        primary_300: "var(--primary_300)",
        accent_100: "var(--accent_100)",
        accent_200: "var(--accent_200)",
        text_100: "var(--text_100)",
        text_200: "var(--text_200)",
        bg_300: "var(--bg_300)",
        bg_200: "var(--bg_200)",
        bg_100: "var(--bg_100)",
        black : "var(--black)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};