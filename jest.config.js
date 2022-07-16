/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  "setupFilesAfterEnv": [ "<rootDir>/test/jest.setup.ts" ],
  transformIgnorePatterns: [
    "node_modules/(?!(chess.js)/)"
  ]
};
