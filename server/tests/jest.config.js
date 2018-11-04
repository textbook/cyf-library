module.exports = {
  rootDir: "..",
  testEnvironment: "./tests/mongo-environment.js",
  globals: {
    DATABASE_URL: "mongodb://localhost:27017/library-tests",
  },
};
