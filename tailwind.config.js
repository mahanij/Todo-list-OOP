/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      "syne":['Syne, sans-serif'],
      "rubik":['Rubik, sans-serif'],
    },
    extend: {
      colors: {
        "primary":"#43766C",
        "secondry":{
          100:"#F8FAE5",
          200:"#6B19470",
          300:"#76453B",
        }
      }
    },
  },
  plugins: [],
}
