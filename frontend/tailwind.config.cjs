/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d6ff',
          300: '#a3b8ff',
          400: '#7a8fff',
          500: '#5261ff',
          600: '#1d4ed8', // Sharp Uber/Logistics Blue
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#172554',
          950: '#020617',
        },
        surface: {
          50: '#fafafa',
          100: '#f5f5f7', // Apple/Uber Style Grey
          200: '#eeeeef',
          300: '#d1d1d6',
          400: '#aeaeb2',
          500: '#8e8e93',
          600: '#636366',
          700: '#48484a',
          800: '#2c2c2e',
          900: '#1c1c1e',
          950: '#000000', // Deep Black
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        }
      },
      boxShadow: {
        'subtle': '0 2px 4px rgba(0,0,0,0.02)',
        'soft': '0 4px 20px rgba(0,0,0,0.04)',
        'premium': '0 20px 40px rgba(0,0,0,0.08)',
        'uber': '0 8px 30px rgba(0,0,0,0.12)',
        'ola': '0 10px 40px -10px rgba(0,0,0,0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'uber': '1.25rem',
        'ola': '2rem',
      },
      fontFamily: {
        sans: ['"Outfit"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
