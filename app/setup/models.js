/*
 * Load models and register with Mongoose
 */
const _ = require('lodash')
const mongoose = require('mongoose')
//const mongoosastic = require('mongoosastic')
const requireSmart = require('require-smart')
const PluginMongoTenant = require('mongo-tenant')
const PluginTimestamp = require('mongoose-timestamp')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')

let model 

module.exports = async (app) => {
  let schemas = requireSmart('../models', {
    skip: [/\..*\.js$/],
  })

  // Return loaded models
  return await walkModels(app, schemas)
}

// recursively walk into models folders
async function walkModels(app, schemas) {
  let models = {}

  for (let name in schemas) {
    let Schema = schemas[name]

    // check if we are dealing with a schema or a subfolder
    if (Schema instanceof mongoose.Schema) {
      // Applies basic plugins to all models

      Schema.plugin(PluginMongoTenant, app.config.mongoTenant)
      Schema.plugin(PluginTimestamp)
      Schema.plugin(mongooseLeanVirtuals)

      // Load model into mongo connection
      models[name] = app.mongo.model(name, Schema)
    } else {
      // Just append to the tree, but don't load it as a Mongoose model
      models[name] = Schema
    }
  }
  
  return models
}


