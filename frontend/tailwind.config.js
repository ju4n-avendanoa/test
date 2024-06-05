/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "375px",
      md: "640px",
      lg: "1024px",
      xl: "1440",
      xxl: "1920px",
    },
  },
  plugins: [],
};
