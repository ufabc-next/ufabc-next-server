const app = require('@/app')
const errors = require('@/errors')

module.exports = async(context) => {
  if(context.query.access_key != app.config.ACCESS_KEY) {
    throw new errors.Forbidden('ACCESS_KEY')
  }
}