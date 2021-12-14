const mongoose = require('mongoose')
const cachegoose = require('cachegoose')
const url = require('url')

/*
 * Connects to MongoDB
 */
module.exports = async (app) => {
  // Set custom promisse library to use
  mongoose.Promise = global.Promise

  let driverOptions = {
    useNewUrlParser: true,
  }

  // open connection
  let conn = await mongoose.createConnection(
    app.config.MONGO_URL,
    driverOptions
  )

  const parsedRedis = url.parse(app.config.REDIS_URL, false, true)

  const cacheOptions = {
    engine: 'redis',
    port: parsedRedis.port,
    host: parsedRedis.hostname,
    auth_pass: app.config.REDIS_PASSWORD,
  }

  if (app.config.REDIS_PASSWORD) {
    cacheOptions.auth_pass = app.config.REDIS_PASSWORD
  }

  // creates a cache layer
  cachegoose(mongoose, cacheOptions)

  return conn
}
