const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const resourcesRouter = require("./resources/routes");

const API_BASE_PATH = "/api";

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

  app.use(`${API_BASE_PATH}/resources`, resourcesRouter);

  app.get("*", (req, res, next) => {
    if (req.url.startsWith(API_BASE_PATH)) {
      return next();
    }
    res.sendFile(path.join(__dirname, "static/index.html"));
  });

  return app;
}

module.exports = appFactory;
