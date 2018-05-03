'use strict'

module.exports.id = 'add-creation-date'

const updates = [
  { name: 'React', created: new Date(981183906000) },
  { name: 'Learn Node in 1 Hour', created: new Date(981180306000) },
  { name: 'Udemy Web Developer Bootcamp', created: new Date(981173106000) },
]

module.exports.up = function (done) {
  const collection = this.db.collection('resources')
  return Promise
    .all(updates.map(({ name, ...rest }) => collection.update({ name }, { $set: rest })))
    .then(() => done())
}

module.exports.down = function (done) {
  return this.db.collection('resources')
    .update({}, { $unset: { created: '' } }, { multi: true })
    .then(() => done())
}
