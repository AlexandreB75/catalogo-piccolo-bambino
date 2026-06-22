/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold:  '#B8965A',
        dark:  '#06080D',
        dark2: '#0D1117',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
