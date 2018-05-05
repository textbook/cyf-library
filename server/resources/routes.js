const express = require('express')
const debug = require('debug')('library:server')
const router = express.Router()

router.get('/', (req, res) => {
  const search = {}
  if (req.query.category) {
    search.categories = req.query.category
  }
  req.db.collection('resources')
    .find(search)
    .sort({ created: -1 })
    .toArray((err, resources) => {
      if (err) {
        debug(err)
        return res.status(500).end()
      }
      res.json(resources.map(({ _id, categories, ...resource }) => ({ ...resource, categories: categories || [] })))
    })
})

module.exports = router
