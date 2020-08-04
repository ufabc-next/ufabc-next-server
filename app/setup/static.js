const express = require('express')
const fs = require('fs')

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
  app.server.get('/snapshot', function(req, res) {
    const { aluno_id } = req.query
    console.log(aluno_id)
    fs.readFile(app.config.snapshotFolder + '/index.html', "utf8", function(err, data) {
      if (err) {
        return console.log(err);
      }
      let result = data
      result = result.replace('ALUNO_ID_HERE', aluno_id)
      res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
      res.write(result);
      res.end();
    });
  })
  app.server.use('/snapshot', express.static(app.config.snapshotFolder, {
    maxAge: app.config.maxAge,
  }))
}
