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
    }
  },
  plugins: []
};
