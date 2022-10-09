/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./features/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    fontFamily: {
      sans: ["Noto Sans", "sans-serif"],
      serif: ["Noto Serif", "serif"],
    },
    screens: {
      sm: "425px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      colors: {
        transparent: "transparent",
        white: "hsl(0 0% 100%)",
        light: "hsl(37 18% 83% / 0.87)",
        black: "hsl(0 0% 12%)",
        grey: {
          200: "hsl(0 0% 0% / 0.1)",
          400: "hsl(174 18% 39% / 0.68)",
        },
        primary: {
          200: "hsl(174, 83%, 39%)",
          400: "hsl(174, 85%, 18%)",
          600: "hsl(175, 85%, 8%)",
        },
        accent: "hsl(356, 79%, 60%)",
      },
    },
  },
  daisyui: {
    styled: false,
    themes: false,
    base: false,
    utils: false,
    logs: true,
    rtl: false,
    prefix: "daisy-",
  },
};
