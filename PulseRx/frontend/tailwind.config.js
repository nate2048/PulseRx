const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors');

module.exports = withMT({
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
      }
    },
  },
  plugins: [],
});