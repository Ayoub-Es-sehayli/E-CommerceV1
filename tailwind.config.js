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
        light: {
          200: "hsla(0, 0%, 95%, 1)",
          DEFAULT: "hsl(37 18% 83% / 0.87)",
        },
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
        accent: {
          200: "hsl(356 79% 60% / 0.68)",
          DEFAULT: "hsl(356 79% 60%)",
        },
        info: {
          200: "hsla(227  84%  65%  0.51)",
          DEFAULT: "hsla(227  84%  65%  1)",
        },
        warning: {
          200: "hsla(29  90%  50% / 0.5)",
          DEFAULT: "hsla(29  90%  50% / 1)",
        },
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
