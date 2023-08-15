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
