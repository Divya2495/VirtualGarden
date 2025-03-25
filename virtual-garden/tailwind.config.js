// tailwind.config.js

module.exports = {
    content: [
      "./app/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./pages/**/*.{ts,tsx}",
    ],
    theme: {
  extend: {
    keyframes: {
      'scale-in': {
        '0%': { transform: 'scale(0)', opacity: '0' },
        '100%': { transform: 'scale(1)', opacity: '1' },
      },
      'fade-up-out': {
        '0%': { opacity: '1', transform: 'translateY(0)' },
        '100%': { opacity: '0', transform: 'translateY(-20px)' },
      },
    },
    animation: {
      'scale-in': 'scale-in 0.3s ease-out',
      'fade-up-out': 'fade-up-out 0.8s ease-in forwards',
    },
  },
},
    plugins: [],
  };
  