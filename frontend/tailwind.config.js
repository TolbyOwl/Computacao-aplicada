/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B0826A',
          dark: '#926750',
          light: '#CEAE9E',
        },
        background: {
          light: '#F8F5F2',
          dark: '#2d2825',
        },
        text: {
          main: '#3D3835',
          muted: '#8A817C',
        },
        accent: {
          DEFAULT: '#799475',
        },
        warning: {
          DEFAULT: '#D18E4E',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
