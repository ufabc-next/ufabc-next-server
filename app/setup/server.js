const Raven = require('raven')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const { createAgent } = require('@forestadmin/agent')
const { createMongooseDataSource } = require('@forestadmin/datasource-mongoose')
const methodOverride = require('method-override')

const logFormat = '[server] [:date[iso]] :status :res[content-length] :response-time ms :method :url :remote-addr'

/*
 * Instantiate and configure express server
 */
module.exports = async (app) => {
  let server = express()

  // Config Sentry
  app.config.isProduction ? Raven.config(app.config.SENTRY).install() : null

  // Configure compression
  server.use(compression())

  // Configure body-parsing
  server.use('^(?!forest).+$', bodyParser.json({ limit: '30mb', extended: true }))
  server.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

  // For browsers that don't make advanced HTTP Method calls
  server.use(methodOverride('_method'))

  // HTTP request Logging
  server.use(morgan(logFormat))

  // Disable x-powered-by, add custom one
  server.disable('x-powered-by')
  server.use((req, res, next) => {
    // Apply custom header to response
    res.setHeader('X-Powered-By', 'UFABC Next')

    // Expose remoteAddress to other middlewares
    let ip = (
      req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''
    ).split(',')[0].trim()
    
    req.remoteAddress = ip

    next()
  })

  createAgent({
    authSecret: process.env.FOREST_AUTH_SECRET,
    envSecret: process.env.FOREST_ENV_SECRET,
    isProduction: process.env.NODE_ENV === 'production'
  })
    .addDataSource(createMongooseDataSource(app.mongo))
    .mountOnExpress(server)
    .start()

  return server
}