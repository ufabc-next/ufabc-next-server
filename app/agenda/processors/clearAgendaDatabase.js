const app = require('@/app')
const MongoClient = require('mongodb')
const moment = require('moment')

module.exports = function (agenda) {
  agenda.define('clearAgendaDatabase', app.helpers.agenda.wrap(clearAgendaDatabase))
}

async function clearAgendaDatabase () {
  try {
    const client = await MongoClient.connect(
      app.config.MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )


    // Keep the past 4 months (quad) of agenda history
    const cutoffDate = moment().subtract(4, 'months').toDate()
    const agendaCollection = client.db('ufabc-matricula').collection('agenda')
    await agendaCollection.deleteMany({ lastRunAt: { $lte: cutoffDate }})

    await client.close()
  } catch(e) {
    console.log(e)
  }
}

module.exports.clearAgendaDatabase = clearAgendaDatabase