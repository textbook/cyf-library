const fs = require("fs");

const { Connection, getDatabaseUrl } = require("../../server/db");

function readJsonFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(content));
      }
    });
  });
}

function clear(db) {
  return db.collections().then((collections) => {
    return Promise.all(
      collections.map((collection) => db.collection(collection.s.name).drop())
    );
  });
}

function seed(db, seedFile) {
  return readJsonFile(seedFile)
    .then((content) =>
      Object.keys(content).map((collection) => {
        const rows = content[collection];
        const now = new Date();
        rows.forEach(
          (row, index) => (row.created = new Date(now.getTime() + 1000 * index))
        );
        return db.collection(collection).insertMany(rows);
      })
    )
    .then((promises) => Promise.all(promises));
}

function databaseAction(func, ...args) {
  return (db) => func(db, ...args).then(() => db);
}

const connection = new Connection(getDatabaseUrl());

connection
  .connect()
  .then(databaseAction(clear))
  .then(databaseAction(seed, process.argv[2]))
  .then(() => connection.disconnect())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
