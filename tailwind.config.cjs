const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Bebas Neue"],
      },
      animation: {
        "slowly-move": "slowly-move 3s infinite",
      },
      keyframes: {
        "slowly-move": {
          "0%, 100%": {
            transform: "translate(1%, 0%)",
          },
          "25%": {
            transform: "translate(0%, 1%)",
          },
          "50%": {
            transform: "translate(-1%, 0%)",
          },
          "75%": {
            transform: "translate(0%, -1%)",
          },
        },
      },
    },
  },
  plugins: [],
};
