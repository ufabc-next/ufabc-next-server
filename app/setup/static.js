const express = require('express')

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

    // In case host doesn't matches the HOST config, continue
    if (host != app.config.HOST) {
      return next()
    }


    next()
  })

  app.server.use(static)
  app.server.use('/snapshot', express.static(app.config.snapshotFolder, {
    maxAge: app.config.maxAge,
  }))
}
