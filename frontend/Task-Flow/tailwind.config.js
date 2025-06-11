/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        72: "18rem",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
