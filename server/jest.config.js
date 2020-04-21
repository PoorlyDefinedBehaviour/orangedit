module.exports = {
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "src"],
  verbose: false,
  silent: false,
}
