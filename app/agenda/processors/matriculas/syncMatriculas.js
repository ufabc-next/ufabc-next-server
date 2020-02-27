const app = require('@/app')
const sync = require('@/api/matriculas/sync/func')

module.exports = function (agenda) {
  agenda.define('syncMatriculas', app.helpers.agenda.wrap(() => {
    agenda.now('syncMatricula')
  }))

  agenda.define('syncMatricula', app.helpers.agenda.wrap(syncMatricula))
}

async function syncMatricula () {
  try {
    await sync({ query: {} })
  } catch(e) {
    console.log(e)
  }
}

module.exports.syncMatricula = syncMatricula