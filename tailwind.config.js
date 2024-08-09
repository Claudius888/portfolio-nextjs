/** @type {import('tailwindcss').Config} */
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
        satoshi: ["Satoshi", 'sans-serif']
      }
    },
  },
  plugins: [],
}

