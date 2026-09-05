/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0C0B0A",
        dusk: "#14151C",
        russet: "#C45C2C",
        "russet-light": "#DE7E4E",
        cream: "#F2E6D0",
        wine: "#8B1E3F",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["'Work Sans'", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest2: "-0.04em",
      },
    },
  },
  plugins: [],
};
