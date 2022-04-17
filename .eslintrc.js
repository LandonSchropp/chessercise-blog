module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [ "@typescript-eslint" ],
  extends: [ "@landonschropp", "@landonschropp/react", "plugin:@typescript-eslint/recommended" ],
  env: {
    es6: true,
    browser: true,
    jest: true
  }
};
