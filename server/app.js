const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const resourcesRouter = require("./resources/routes");

function appFactory(database) {
  const app = express();

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "static")));

  app.use((req, res, next) => {
    req.db = database;
    next();
  });

  app.use("/api/resources", resourcesRouter);

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "static/index.html"));
  });

  return app;
}

module.exports = appFactory;
