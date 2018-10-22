const mongoose = require('mongoose')
const cachegoose = require('cachegoose')

/*
 * Connects to MongoDB 
 */
module.exports = async (app) => {
  // Set custom promisse library to use
  mongoose.Promise = global.Promise

  let driverOptions = {
    useNewUrlParser: true
  }

  // open connection
  let conn = await mongoose.createConnection(app.config.MONGO_URL, driverOptions)

  // creates a cache layer
  cachegoose(mongoose, {
    engine: 'redis',
    url: app.config.REDIS_URL
  })

  return conn
}
