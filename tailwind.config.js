/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Noto Sans", "sans-serif"],
      serif: ["Noto Serif", "serif"],
    },
    colors: {
      transparent: "transparent",
      white: "hsl(0 0% 100%)",
      black: "hsl(0 0% 12%)",
      grey: {
        200: "hsl(174 18% 39%/ 0.68)",
        400: "hsl9174 18% 39%/ 0.68)",
      },
      primary: {
        200: "hsl(174, 83%, 39%)",
        400: "hsl(174, 85%, 18%)",
        600: "hsl(175, 85%, 8%)",
      },
      accent: "hsl(356, 79%, 60%)",
    },
    extend: {},
  },
  plugins: [],
};
