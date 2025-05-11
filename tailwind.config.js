/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: false, // ダークモードを無効化
  theme: {
    extend: {
      colors: {
        primary: '#2B2B2B',
      },
    },
  },
  plugins: [],
} 