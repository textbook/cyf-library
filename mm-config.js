module.exports = {
  directory: "./server/migrations",
  url: process.env.DATABASE_URL || "mongodb://localhost:27017/library",
};
