const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')
const Raven = require('raven')
const parser = require('ua-parser-js')

module.exports = (err, req, res, next) => {
  if (!err) {
    return next()
  }

  // Gatter error metadata
  let body = app.helpers.parse.error(err)

  // Add stack on debug mode
  if (!app.config.isProduction) {
    body.stack = err.stack
  }

  // Apply status to response
  res.status(body.status)

  // Cleanup body if in production
  if (app.config.isProduction && body.status == 500) {
    // Prepare response to user
    body.type = 'FatalError'
    body.error = 'Um erro inesperado aconteceu e foi enviado aos nossos desenvolvedores'
    
    // Get user agent
    const ua = _.pick(parser(req.headers['user-agent']), ['browser', 'os'])
    ua.os.name = ua.os.name.replace('Mac OS', 'Mac OS X')
    ua.user = _.pick(req.user, ['id', 'email', 'name'])

    Raven.captureException(err, { contexts: ua })
  }

  if (!app.config.isProduction && body.status == 500) {
    console.log(err) 
  }

  // Send back error
  return res.send(body)
}
