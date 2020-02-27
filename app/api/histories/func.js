const app = require('@/app')

module.exports = async function (context) {
  app.agenda.now('updateStuff', { json: context.body.json || {} })

  return {
    status: 'published'
  }
}