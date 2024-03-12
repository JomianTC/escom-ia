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
        primary_100: "#0f68a3",
        primary_200: "#5596d5",
        primary_300: "#bff9ff",
        accent_100: "#3d5a80",
        accent_200: "#e2f2ff",
        text_100: "#ffffff",
        text_200: "#e0e0e0",
        bg_300: "#2b3444",
        bg_200: "#1f2b3e",
        bg_100: "#0f1c2e",
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