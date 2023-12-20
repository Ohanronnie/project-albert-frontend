/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./**/*.{html,htm}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
