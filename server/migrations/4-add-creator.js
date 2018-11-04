"use strict";

module.exports.id = "add-creator";

module.exports.up = function(done) {
  const collection = this.db.collection("resources");
  return collection
    .find()
    .toArray()
    .then((resources) =>
      Promise.all(
        resources.map((resource) => {
          resource.creator = "textbook";
          collection.save(resource);
        })
      )
    )
    .then(() => done());
};

module.exports.down = function(done) {
  return this.db
    .collection("resources")
    .update({}, { $unset: { creator: "" } }, { multi: true })
    .then(() => done());
};
