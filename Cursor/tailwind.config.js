/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0B6EEF',
          secondary: '#0FB6D6',
          accent: '#16B39A',
        },
      },
    },
  },
  plugins: [],
};