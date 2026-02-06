/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        'synergy-blue': '#0066FF',
        'deep-navy': '#0A1628',
        // Secondary
        'soft-blue': '#E8F1FF',
        'medium-blue': '#3385FF',
        'muted-navy': '#1A2A42',
        // Accents
        'success': '#00C851',
        'warning': '#FFB400',
        'error': '#FF3B30',
        'accent-purple': '#7C3AED',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'mesh-move': 'meshMove 20s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        meshMove: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(2%, -2%) scale(1.02)' },
          '50%': { transform: 'translate(-1%, 1%) scale(0.98)' },
          '75%': { transform: 'translate(1%, 2%) scale(1.01)' },
        },
      },
    },
  },
  plugins: [],
};
