let _ = require("lodash");
const defaultTheme = require("tailwindcss/defaultTheme");

const BASE_SPACING = 1.25 / 4;

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    colors: ({ colors }) => {
      return {
        inherit: colors.inherit,
        current: colors.current,
        transparent: colors.transparent,

        mediumPurple: "#836fdd",

        blackOut: "#1b1c21",
        mineShaft: "#292b33",
        emperor: "#484a54",
        gray: "#81838f",
        greatFalls: "#a1a4b3",
        cerebral: "#bec1cc",
        steam: "#d3d5de",
        bleach: "#ebecf2",
        white: "#fff"
      };
    },
    fontFamily: {
      sans: [ "Open Sans", "sans-serif" ],
      serif: [ "Gentium Book Basic", "serif" ],
      mono: [ "Source Code Pro", "monospace" ]
    },
    spacing: _.mapValues(defaultTheme.spacing, (value, key) => {
      return /^[\d.]+$/.test(key) ? `${ parseFloat(key) * BASE_SPACING }rem` : value;
    })
  },
  plugins: []
};
