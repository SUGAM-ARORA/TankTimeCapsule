/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Shark Tank India Theme Colors
        'shark-blue': {
          50: '#e6f3ff',
          100: '#b3d9ff',
          200: '#80bfff',
          300: '#4da6ff',
          400: '#1a8cff',
          500: '#0066cc', // Primary blue
          600: '#0052a3',
          700: '#003d7a',
          800: '#002952',
          900: '#001429',
        },
        'shark-gold': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Primary gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'shark-teal': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Primary teal
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        'shark-gray': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b', // Primary gray
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        'shark-warm': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899', // Primary warm
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
      backgroundImage: {
        'shark-gradient': 'linear-gradient(135deg, #0066cc 0%, #14b8a6 50%, #f59e0b 100%)',
        'shark-blue-gradient': 'linear-gradient(135deg, #001429 0%, #0066cc 50%, #4da6ff 100%)',
        'shark-gold-gradient': 'linear-gradient(135deg, #78350f 0%, #f59e0b 50%, #fcd34d 100%)',
        'shark-teal-gradient': 'linear-gradient(135deg, #134e4a 0%, #14b8a6 50%, #5eead4 100%)',
      },
      fontFamily: {
        'shark': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shark-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shark-bounce': 'bounce 1s infinite',
        'shark-spin': 'spin 1s linear infinite',
        'shark-ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'shark-float': 'float 6s ease-in-out infinite',
        'shark-glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #0066cc, 0 0 10px #0066cc, 0 0 15px #0066cc' },
          '100%': { boxShadow: '0 0 10px #14b8a6, 0 0 20px #14b8a6, 0 0 30px #14b8a6' },
        },
      },
      boxShadow: {
        'shark': '0 10px 25px -3px rgba(0, 102, 204, 0.1), 0 4px 6px -2px rgba(0, 102, 204, 0.05)',
        'shark-lg': '0 20px 25px -5px rgba(0, 102, 204, 0.1), 0 10px 10px -5px rgba(0, 102, 204, 0.04)',
        'shark-xl': '0 25px 50px -12px rgba(0, 102, 204, 0.25)',
        'shark-glow': '0 0 20px rgba(0, 102, 204, 0.3)',
      },
    },
  },
  plugins: [],
};