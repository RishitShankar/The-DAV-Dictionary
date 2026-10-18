/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dav: {
          blue: '#0F3460',
          dark: '#16213E',
          gold: '#E5A93C',
          accent: '#1E40AF',
          maroon: '#800000',
          crimson: '#8B0000',
          light: '#F8FAFC'
        }
      }
    },
  },
  plugins: [],
}
