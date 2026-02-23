/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          green: {
            50: '#f0f9f4',
            100: '#dcf2e3',
            200: '#bce4ca',
            300: '#8fcea8',
            400: '#5cb07d',
            500: '#3a8f5c',
            600: '#2a7148',
            700: '#235a3b',
            800: '#1f4931',
            900: '#1a3d29',
          },
        },
        earth: {
          50: '#faf7f2',
          100: '#f4ede0',
          200: '#e7d9c2',
          300: '#d7bf9a',
          400: '#c49f6f',
          500: '#b5854f',
          600: '#a7703f',
          700: '#8b5a35',
          800: '#724a2f',
          900: '#5e3e28',
        },
        wood: {
          50: '#faf8f5',
          100: '#f3ede4',
          200: '#e5d9c9',
          300: '#d4bfa6',
          400: '#c09f7a',
          500: '#b0885e',
          600: '#a1754f',
          700: '#855f42',
          800: '#6d4e39',
          900: '#5a4131',
        },
        beige: {
          50: '#fefdfb',
          100: '#faf8f3',
          200: '#f4efe5',
          300: '#ebe2d0',
          400: '#dfd0b5',
          500: '#d0ba94',
          600: '#c0a478',
          700: '#a6895f',
          800: '#8a7150',
          900: '#715d44',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      keyframes: {
        'scale-pulse': {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          },
          '50%': { 
            transform: 'scale(1.12)',
            boxShadow: '0 20px 25px -5px rgba(42, 113, 72, 0.4), 0 10px 10px -5px rgba(42, 113, 72, 0.2)'
          },
        },
      },
      animation: {
        'scale-pulse': 'scale-pulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
