/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          obsidian: '#0a0a0a',
          charcoal: '#1a1a1a',
          champagne: '#f7f3e9',
          cream: '#faf8f3',
          gold: {
            50: '#f9f5e8',
            100: '#f0e6c8',
            200: '#e8d4a3',
            300: '#dfc27e',
            400: '#d6af59',
            500: '#c99c2c',
            600: '#b38420',
            700: '#8c6618',
            800: '#654810',
            900: '#3e2a08',
          },
          burgundy: {
            50: '#f9e8eb',
            100: '#f0d1d6',
            200: '#e6b9c1',
            300: '#dba1ac',
            400: '#d18997',
            500: '#c77182',
            600: '#a55a68',
            700: '#84434e',
            800: '#632c34',
            900: '#42151a',
          },
        },
        premium: {
          sage: {
            100: '#e8ede4',
            200: '#d4dbd0',
            300: '#c0c9bb',
            400: '#a8b7a0',
            500: '#8b9d7f',
          },
          cream: {
            100: '#fdfbf7',
            200: '#f5f0e8',
            300: '#e8e0d5',
          },
          blush: {
            100: '#fce4ec',
            200: '#f8bbd9',
            300: '#f48fb1',
          },
          terracotta: '#c9a227',
          warmBrown: '#8b7355',
          elegantGold: '#c9a227',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        arabic: ['"Amiri"', '"Cairo"', '"Tajawal"', 'serif'],
        script: ['"Alex Brush"', '"Great Vibes"', 'cursive'],
        elegant: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'luxury-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)',
        'gold-gradient': 'linear-gradient(135deg, #c99c2c 0%, #d6af59 50%, #c99c2c 100%)',
        'champagne-gradient': 'linear-gradient(135deg, #f7f3e9 0%, #faf8f3 50%, #f7f3e9 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'rotate-slow': 'rotateSlow 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'gold-glow': '0 0 40px rgba(201, 156, 44, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
