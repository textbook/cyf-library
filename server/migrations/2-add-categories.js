"use strict";

module.exports.id = "add-categories";

const updates = [
  { name: "React", categories: ["javascript", "react"] },
  { name: "Udemy Web Developer Bootcamp", categories: ["html", "css", "javascript"] },
  { name: "Learn Node in 1 Hour", categories: ["javascript", "node"] },
];

module.exports.up = function (done) {
  const collection = this.db.collection("resources");
  return Promise
    .all(updates.map(({ name, categories }) => collection.update({ name }, { $set: { categories } })))
    .then(() => done());
};

module.exports.down = function (done) {
  return this.db.collection("resources")
    .update({}, { $unset: { categories: "" } }, { multi: true })
    .then(() => done());
};
