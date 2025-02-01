/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
      },
      fontFamily: {
        playwright: ['Playwright India', 'serif'],
        greek: ['Cinzel', 'serif'],
        italic: ['Cormorant Italic', 'serif']
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
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
    plugin(function({ addBase }) {
      addBase({
        ':root': {
          '--accent': '#982ae1'
        },
      });
    }),
  ],
}

