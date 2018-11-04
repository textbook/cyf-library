const { getDatabaseUrl } = require("./server/db");

module.exports = {
  directory: "./server/migrations",
  url: getDatabaseUrl(),
};
