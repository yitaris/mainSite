/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        purple: '#4b4a70',
        custom: '#c7aaa5',
        primary: "#050816",
        secondary: "#685f77",
        tertiary: "#4b4a70",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
        'custom-gradient': 'linear-gradient(to bottom, #e3e2e0, #e3e2e0)',
      },
    },
  },
  plugins: [],
};
