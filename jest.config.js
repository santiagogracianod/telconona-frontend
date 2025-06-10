// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"],
  moduleFileExtensions: ["js","jsx","ts","tsx"],
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};
