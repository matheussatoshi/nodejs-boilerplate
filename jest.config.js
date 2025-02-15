/** @type {import('jest').Config} */
const config = {
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  coverageDirectory: "coverage",
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/tests/e2e/cypress",
  ],
  moduleNameMapper: {
    "@/tests/(.*)": "<rootDir>/tests/$1",
    "@/(.*)": "<rootDir>/src/$1",
  },
};

export default config;
