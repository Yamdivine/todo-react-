/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-navy': '#0F172A',
        'navy': '#1E293B',
        'light-navy': '#334155',
        'blue-accent': '#3B82F6',
      },
    },
  },
  plugins: [],
}