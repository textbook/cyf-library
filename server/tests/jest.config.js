module.exports = {
  testEnvironment: "./mongo-environment.js",
  globals: {
    DATABASE_URL: "mongodb://localhost:27017/library-tests",
  },
};
