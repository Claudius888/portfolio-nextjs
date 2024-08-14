/** @type {import('tailwindcss').Config} */

const svgToDataUri = require("mini-svg-data-uri");
 
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screen: {
        'xsm': '400px'
      },
      backgroundImage: {
        "gradient-1": "linear-gradient(180deg, #184bff, #174aff)",
        "gradient-2": "linear-gradient(180deg,#00c2ff,#ff29c3)",
        "white-gradient": "linear-gradient(180deg, #fff, #c8c8c8)",
        "text-gradient-1": "radial-gradient(66.11% 66.11% at 50% 33.89%,hsla(0,0%,100%,.4) 0,hsla(0,0%,100%,0) 100%),linear-gradient(278.88deg,#fff,#66e3ff 28.83%,#a787ff 56.31%,#ffc875 86.49%)"
      },
      spacing: {
        'container-padding': 'var(--container-padding)',
        'section-padding': 'clamp(5em, 21vh, 12em)',
        'arrow': 'clamp(.9em, 1.1vw, 1.1em);',
        'btn-round': 'clamp(9em, 12vw, 11em)',
        'gap-padding': 'clamp(1.5em, 4vw, 2.5em)',
      },
      colors: {
        'dark': '#1C1D20',
        'blue': '#455CE9',
        'color-border': 'rgba(28, 29, 32, 0.175)'
      },
      fontFamily: {
        satoshi: "var(--font-satoshi)"
      }
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="128" height="128" fill="none" stroke-width="0.6" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
}

// "bg-grid-small": (value) => ({
//   backgroundImage: `url("${svgToDataUri(
//     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
//   )}")`,
// }),
// "bg-dot": (value) => ({
//   backgroundImage: `url("${svgToDataUri(
//     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
//   )}")`,
// }),