const app = require('@/app')

module.exports = function (agenda) {
  agenda.define('updateFromHistory', app.helpers.agenda.wrap(updateFromHistory))
}

async function updateFromHistory () {
  const histories = await app.models.histories.find({}).skip(1999).limit(5)

  for (var [key, history] of histories.entries()) {
    await history.save()
    console.log('saved history', key)
  }
}

module.exports.updateFromHistory = updateFromHistory