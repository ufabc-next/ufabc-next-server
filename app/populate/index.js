// this file populates MongoDB test database with data
const _ = require('lodash')
const app = require('../app')
const bluebird = require('bluebird')
const requireSmart = require('require-smart')
const cachegoose = require('cachegoose')
require('dotenv').config()

/*
  If this file is imported, then it must export a function
  so that the requiree can call it
  But if it's called from terminal we just need to run it
  So, we need to check if it's an import
  */
if (module.parent) {
  // exports function to requiree
  module.exports = (async function (){
    try {
      return await populate(...arguments)
    } catch (e) {
      process.exit(1)
    }
  })
} else {
  // run populate
  (async function (){
    try {
      await populate()
      process.exit(0)
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  })()
}

async function populate(options) {
  let operation, context, only, until

  // check if running from terminal or is required
  // and set operation and context accordingly
  if(options == null) {
    operation = process.argv[2]
    context = process.argv[3]
    only = process.argv[4]
  } else {
    operation = options.operation
    context = options.context
    only = options.only
    until = options.until
  }

  if(process.env.NODE_ENV == 'production') {
    throw new Error('You cannot populate under production mode!!!')
  }

  // DO NOT CHANGE THIS
  const COMMUNITY = 'test'
  // DO NOT CHANGE THIS

  if(!['add', 'remove', 'both'].includes(operation)) {
    throw new Error('Wrong operation. Choose between: add, remove or both')
  }

  if(context != null && !['remote', 'local', null].includes(context)) {
    throw new Error('Wrong context. Choose between: remote or local')
  }

  // ONLY SET PROCESS WHEN USING TERMINAL, NOT FROM CODE
  // only show this when running from terminal
  if(options == null) {
    console.info('Bootstrapping basic components...')
    console.info()
    await app.bootstrap([
      'package',
      'config',
      'helpers',
      'mongo',
      'models',
      'redis',
      'redirect'
    ])

    if(context == 'remote') {
      process.env.MONGO_URL = process.env.POPULATE_REMOTE
    }

    if(context == 'local' || context == null) {
      process.env.MONGO_URL = process.env.POPULATE_LOCAL || process.env.MONGO_URL
    }

  }

  if (operation == 'add') {
    return await createDatabases(app, COMMUNITY, only, until)
  }

  if (operation == 'remove') {
    return await dumpDatabases(app, COMMUNITY, only, until)
  }

  if(operation == 'both') {
    await dumpDatabases(app, COMMUNITY, only, until)
    let resp = await createDatabases(app, COMMUNITY, only, until)
    return resp
  }
}

// extend lodash to sort by key
_.mixin({
  'sortKeysBy': function (obj, comparator) {
    var keys = _.sortBy(_.keys(obj), function (key) {
      return comparator ? comparator(obj[key], key) : key
    })

    return _.zipObject(keys, _.map(keys, function (key) {
      return obj[key]
    }))
  }
})

// give models priorities
// it is necessary because some models needs ids (or models) from another models
const modelPriority = {
  teachers: 1,
  subjects: 2,
}

async function createDatabases(app, COMMUNITY, only, until){
  // load models from data folder and sort them by priority

  const data = _.sortKeysBy(requireSmart('./data'), function(prev, next) {
    return modelPriority[next]
  })

  // store all the ids for every model
  let ids = {}

  for (let model in data) {
    if(only != null && !only.includes(model)) continue
    let generateData = data[model]

    // must pass the ids to generateData(ids), because some models need it
    let dataModels = generateData(app, ids)

    // avoid wrong device sign up on dev enviroment
    // this can cause Firebase FCM problems
    if(app.config.ENV == 'dev' && model == 'user') {
      dataModels = dataModels.map(m => {
        delete m.devices
        return m
      })
    }

    let Model, resp

    Model = app.models[model].bySeason(app.helpers.season.findSeasonKey())
    if(['teachers', 'subjects', 'histories'].includes(model)) {
      Model = app.models[model]
    }

    let shouldIndex = Model.schema.plugins.some(p => _.get(p.opts, 'indexAutomatically', false))

    // wait for everything being properly indexed in elasticsearch
    let saved = dataModels.map(data => {
      return new Promise(function (resolve) {
        Model.create(data, (err, model) => {
          console.log(err)
          if(err){
            throw new Error(err)
          }
          if(!shouldIndex) resolve(model)
          else model.once('es-indexed', () => {
            resolve(model)
          })
        })
      })
    })

    resp = await Promise.all(saved)

    // reload indexes
    if(shouldIndex) {
      let client = app.elastic
      let refresh = bluebird.promisify(client.indices.refresh, { context: client })
      let exists = bluebird.promisify(client.indices.exists, { context: client })

      let indexName = model.toLowerCase()

      // refresh index if exists
      let indexExists = await exists({ index: indexName })
      if(indexExists) {
        await refresh({ index: indexName })
      }
    }

    // store response in ids.model
    ids[model] = resp
    if(until != null && until.includes(model)) break
  }

  return ids
}

// async function isReady(Model){
//   let ready = false
//   while(!ready) {
//     let models = await Model.find({}).count()
//     ready = (models == 0) ? true : false
//   }
// }

async function dumpDatabases(app, COMMUNITY, only, until) {
  const data = _.sortKeysBy(requireSmart('./data'), function(prev, next) {
    return modelPriority[next]
  })


  cachegoose.clearCache(null)
  await app.redis.cache.clear()

  for (let key in data) {
    if(only != null && !only.includes(key)) continue

    let Model = app.models[key]

    // dump all indexes for a given model in elasticsearch
    if(_.isFunction(Model.search)) {
      let client = app.elastic
      let remove = bluebird.promisify(client.indices.delete, { context: client })
      let exists = bluebird.promisify(client.indices.exists, { context: client })

      let indexName = key.toLowerCase()

      // remove index if exists
      let indexExists = await exists({ index: indexName })
      if(indexExists) {
        await remove({ index: indexName })
      }
    }

    await app.models[key].remove({})

    if(until != null && until.includes(key)) break
  }
}