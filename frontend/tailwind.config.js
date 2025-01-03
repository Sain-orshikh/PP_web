/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true,
  theme: {
    extend: {
      fontFamily: {
        greek: ['Cinzel', 'serif'],
        italic: ['Cormorant Italic', 'serif']
      }
    },
  },
  plugins: [],
}

