const app = require('@/app')
const fs = require('fs')
const path = require('path')

module.exports = async function (context) {
  const quad = 1
  const year = 2015

  var data = JSON.parse(fs.readFileSync(path.join(__dirname, `./processed/${year}.${quad}.json`), 'utf8'))

  app.agenda.now('updateStuff', {
    json: data
  })

  return {
    status: 'published'
  }
}