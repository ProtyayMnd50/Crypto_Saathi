import { COLORS } from "./src/constants.ts";
/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/spinner.js",
  ],
  theme: {
    extend: {
      colors: {
        "main-darkest": COLORS.mainDarkest,
        "main-darker": COLORS.mainDarker,
        "main-dark": COLORS.mainDark,
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: COLORS.mainDarkest,
            primary: COLORS.primary,
          },
        },
      },
    }),
  ],
};
