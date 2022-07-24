/* eslint-disable @typescript-eslint/no-var-requires */

const _ = require("lodash");
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

        malibu: "#72bbff",
        cornflowerBlue: "#627ff6",
        mediumPurple: "#836fdd",
        amethyst: "#955fc2",
        fuzzyWuzzyBrown: "#c35151",
        strawberryWine: "#cd6a6a",
        neonCarrot: "#f99d3f",
        saffron: "#f4ce2c",
        aquaForest: "#56af7b",

        // TODO: Clean up the newly-added colors
        blackOut: "#1b1c21",
        mineShaft: "#292b33",
        emperor: "#484a54",
        scriptInk: "#60626c",
        gray: "#81838f",
        greatFalls: "#a1a4b3",
        cerebral: "#bec1cc",
        steam: "#d3d5de",
        bleach: "#ebecf2",
        concrete: "#f2f2f2",
        white: "#fff"
      };
    },
    fontFamily: {
      sans: [ "Roboto", "sans-serif" ],
      serif: [ "Gentium Book Basic", "serif" ],
      mono: [ "Source Code Pro", "monospace" ]
    },
    spacing: _.mapValues(defaultTheme.spacing, (value, key) => {
      return /^[\d.]+$/.test(key) ? `${ parseFloat(key) * BASE_SPACING }rem` : value;
    }),
    scale: {
      flip: "-1"
    }
  },
  plugins: []
};
