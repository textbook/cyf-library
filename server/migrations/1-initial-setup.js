"use strict";

module.exports.id = "initial-setup";

const resources = [
  { name: "React", url: "https://reactjs.org/", description: "The official website for React" },
  {
    name: "Udemy Web Developer Bootcamp",
    url: "https://www.udemy.com/the-web-developer-bootcamp/",
    description: "The only course you need to learn web development - HTML, CSS, JS, Node, and More!",
  },
  {
    name: "Learn Node in 1 Hour",
    url: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
    description: "Node.js Tutorial for Beginners",
  },
];

module.exports.up = function (done) {
  return this.db.collection("resources").insertMany(resources).then(() => done());
};

module.exports.down = function (done) {
  return this.db.collection("resources").drop().then(() => done());
};
