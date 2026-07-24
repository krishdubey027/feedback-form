/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal:       '#0E9E8E',
          'teal-dark':'#0A8578',
          'teal-mid': '#0C9282',
          'teal-light':'#E6F7F5',
          'teal-pale': '#F0FAF9',
          text:       '#1A2B3C',
          subtext:    '#6B7280',
          border:     '#E5E7EB',
          error:      '#EF4444',
          'bg-light': '#F8FFFE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.07)',
        input: '0 1px 4px rgba(0,0,0,0.06)',
        'input-focus': '0 0 0 3px rgba(14,158,142,0.15)',
      },
      borderRadius: {
        card: '16px',
        input: '10px',
        btn: '10px',
      },
      transitionDuration: {
        250: '250ms',
      },
    },
  },
  plugins: [],
};
