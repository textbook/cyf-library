'use strict'

module.exports.id = 'initial-setup'

module.exports.up = function (done) {
  this.db.collection('resources').insertMany([
    { name: 'React', url: 'https://reactjs.org/', description: 'The official website for React' },
    {
      name: 'Udemy Web Developer Bootcamp',
      url: 'https://www.udemy.com/the-web-developer-bootcamp/',
      description: 'The only course you need to learn web development - HTML, CSS, JS, Node, and More!'
    },
    {
      name: 'Learn Node in 1 Hour',
      url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
      description: 'Node.js Tutorial for Beginners'
    },
  ])
  done()
}

module.exports.down = function (done) {
  this.db.collection('resources').drop()
  done()
}
