/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: 'var(--accent)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
      },
      fontFamily: {
        playwright: ['Playwright India', 'serif'],
        greek: ['Cinzel', 'serif'],
        italic: ['Cormorant Italic', 'serif'],
        harmonique: ['harmonique', 'serif'],
      },
      fontWeight: {
        normal: 400,
        semibold: 500,
        bold: 700,
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'slide-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        'slide-in-right':{
          '0%': {
            opacity: '0',
            transform: 'translateX(100px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards'
      }
    },
  },
  safelist: [
    'text-black',
    'text-red-500',
    'text-blue-500',
    'text-purple-800',
    'text-white',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    plugin(function({ addBase }) {
      addBase({
        ':root': {
          '--accent': '#982ae1',
          '--primary': "rgb(29, 155, 240)",
          '--secondary': "rgb(24, 24, 24)",
        },
      });
    }),
  ],
}
