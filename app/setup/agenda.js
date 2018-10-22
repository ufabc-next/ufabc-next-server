const _ = require('lodash')
const Agenda = require('agenda')
const requireSmart = require('require-smart')

// Load helpers into app.helper
module.exports = async(app) => {
  let files =  requireSmart('../agenda', {
    skip: [/spec\.js$/],
  })

  const FIVE_MINUTES = 1000 * 60 * 5

  const agenda = new Agenda({
    db: {
      address: app.config.MONGO_URI,
      collection: 'agenda'
    },
    defaultLockLifetime: FIVE_MINUTES,
    processEvery: '10 seconds'
  })

  // only initialize jobs if we are not testing
  !app.config.isTest ? initialize(files, agenda) : null

  // wait agenda to be ready before returning
  return new Promise((resolve, reject) => {
    agenda.once('ready', async function () {
      const collection = _.get(agenda, '_collection.collection', null) || agenda._collection 

      // make sure indexes are created to optimized front-end
      await collection.createIndexes([
        { key: { nextRunAt: -1, lastRunAt: -1, lastFinishedAt: -1 } },
        { key: { name: 1, nextRunAt: -1, lastRunAt: -1, lastFinishedAt: -1 } }
      ])

      resolve(agenda)
    })
  })
}

// initialize all jobs from agenda
function initialize(files, agenda) {
  if(_.isObject(files) && !_.isFunction(files)) {
    Object.keys(files).map(key => initialize(files[key], agenda))
  }
  if(_.isFunction(files)) {
    files(agenda)
  }
}