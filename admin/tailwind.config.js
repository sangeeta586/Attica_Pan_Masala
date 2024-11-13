/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [],
  theme: {
    extend: {

      
    },
  },
  plugins: [],
});

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      margin: {
        '40-percent': '40%',
      },
      inset: {
        '40-percent': '40%',
      },
    },
  },
  plugins: [],
}

