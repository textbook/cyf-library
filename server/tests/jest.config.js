module.exports = {
  rootDir: "..",
  testEnvironment: "./tests/mongo-environment.js",
  globals: {
    MONGODB_URI: "mongodb://localhost:27017/library-tests",
  },
};
