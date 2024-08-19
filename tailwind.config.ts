import type { Config } from 'tailwindcss';

import svgToDataUri from 'mini-svg-data-uri';

import colors from 'tailwindcss/colors';
// import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette';
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        dark: '#1C1D20',
        blue: '#455CE9',
        'black-dark': '#1C1D20',
        'color-border': 'rgba(28, 29, 32, 0.175)',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        "appear": {
          from: {
            opacity: '0',
            transform: 'translateY(4rem)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0%)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        "appear": "appear 750ms ease-in-out",
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(180deg, #184bff, #174aff)',
        'gradient-2': 'linear-gradient(180deg,#00c2ff,#ff29c3)',
        'white-gradient': 'linear-gradient(180deg, #fff, #c8c8c8)',
        'text-gradient-1':
          'radial-gradient(66.11% 66.11% at 50% 33.89%,hsla(0,0%,100%,.4) 0,hsla(0,0%,100%,0) 100%),linear-gradient(278.88deg,#fff,#66e3ff 28.83%,#a787ff 56.31%,#ffc875 86.49%)',
      },
      spacing: {
        'container-padding': 'var(--container-padding)',
        'section-padding': 'clamp(5em, 21vh, 12em)',
        arrow: 'clamp(.9em, 1.1vw, 1.1em);',
        'btn-round': 'clamp(9em, 12vw, 11em)',
        'gap-padding': 'clamp(1.5em, 4vw, 2.5em)',
      },
      fontFamily: {
        satoshi: 'var(--font-satoshi)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'bg-grid': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="128" height="128" fill="none" stroke-width="0.6" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      );
    },
  ],
} satisfies Config;

export default config;
