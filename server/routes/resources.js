const express = require('express')
const debug = require('debug')('library:server')
const router = express.Router()

router.get('/', (req, res) => {
  req.db.collection('resources')
    .find({})
    .toArray((err, docs) => {
      if (err) {
        debug(err)
        return res.status(500).end()
      }
      res.json(docs.map(({ _id, ...doc}) => doc))
    })
})

module.exports = router
