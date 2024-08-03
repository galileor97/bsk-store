const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        graphik: ["Graphik", "sans-serif"],
        graphikMedium: ["Graphik-medium", "sans-serif"],
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}