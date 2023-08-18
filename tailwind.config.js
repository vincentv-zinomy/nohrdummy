/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        brand: {
          blue: {
            50: "#2D9CDB",
            100: "#2E68B8",
            200: "#191A1D",
          },
          light: "#f3f3eb",
          grey: "#455A64",
          darkgrey: "#484848",
          orange: "#FF725E",
          
          green: "#006D2C",
          darkGreen: "#0C4A25",
          dark: "#191A1D",
          yellow: "#FEC510",
          pure: "#EEF4EB",

          gray: {
            100: "#EEF4EB",
            200: "#CCCCCC",
            300: "#484848",
            400: "#CECECE33",
          },
        },
      },
      backgroundImage: {
        heroBg: "url('../assets/images/shared/bg-hero.svg')",
        secondaryBg: "url('../assets/images/bgImage/sircleBg.svg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
