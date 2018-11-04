#!/usr/bin/env node

/**
 * Module dependencies.
 */

const debug = require("debug")("library:server");
const http = require("http");

const appFactory = require("./app");
const { Connection, getDatabaseUrl } = require("./db");

let server;

const mongoUrl = getDatabaseUrl();
debug(`Connecting to ${mongoUrl}`);

const connection = new Connection(mongoUrl);

connection.connect().then((db) => {
  const app = appFactory(db);

  const port = parseInt(process.env.PORT || "3000");
  app.set("port", port);

  server = http.createServer(app);

  server.listen(port);
  server.on("listening", () => {
    debug(`Listening on ${port}`);
  });
});

function shutdown() {
  connection
    .disconnect()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
