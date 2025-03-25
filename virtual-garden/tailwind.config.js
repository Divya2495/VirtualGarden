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
          rain: {
            "0%": { transform: "translateY(-100%)" },
            "100%": { transform: "translateY(100vh)" },
          },
        },
        animation: {
          rain: "rain 0.6s linear infinite",
        },
      },
    },
    plugins: [],
  };
  