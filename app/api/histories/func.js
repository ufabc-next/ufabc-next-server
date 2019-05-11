const app = require('@/app')
const fs = require('fs')
const path = require('path')

module.exports = async function (context) {
  app.agenda.now('updateStuff', { json: context.body.json || {} })

  return {
    status: 'published'
  }
}