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

