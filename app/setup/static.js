const express = require('express')
const fallback = require('express-history-api-fallback')

/*
 * Serve assets on app.config.DIST_FOLDER
 */
module.exports = async (app) => {
  let static = express.static(app.config.distFolder, {
    maxAge: app.config.maxAge,
  })
  app.server.use ((req, res, next) => {
    let headers = req.headers

    //Get Headers
    let host = headers['host']
    let protocol = headers['x-forwarded-proto']

    // In case host doesn't matches the HOST config, continue
    if (host != app.config.HOST) {
      return next()
    }

    // Check if should upgrade to https
    if (protocol != 'https') {
      let target = `https://${host}${req.url}`
      // return res.redirect(target)
    }

    next()
  })

  app.server.use(static)
  app.server.use('/snapshot', express.static(app.config.snapshotFolder, {
    maxAge: app.config.maxAge,
  }))
}
