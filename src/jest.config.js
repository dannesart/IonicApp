const { defaults } = require("jest-config");

// Make sure NODE_ENV is set to test environment
process.env.NODE_ENV = "test";

const esModules = ["@ionic"].join("|");

module.exports = {
  globals: {
    "ts-jest": {
      diagnostics: false,
      babelConfig: {
        presets: [
          [
            "@babel/preset-env",
            { targets: { node: true }, modules: "commonjs" },
          ],
        ],
        moduleNameMapper: {
          "@/(.*)": "<rootDir>/$1",
        },
        plugins: ["@babel/plugin-syntax-dynamic-import"],
      },
    },
  },
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
};
