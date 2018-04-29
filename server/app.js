const express = require('express')
const expressMongo = require('express-mongo-db')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const resourcesRouter = require('./routes/resources')

function appFactory (mongoUrl) {
  const app = express()

  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, 'static')))

  app.use(expressMongo(mongoUrl))

  app.use('/api/resources', resourcesRouter)

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/index.html'))
  })

  return app
}

module.exports = appFactory
