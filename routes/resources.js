const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json([
    { name: 'React', description: 'The official website for React', url: 'https://reactjs.org/' }
  ])
})

module.exports = router
