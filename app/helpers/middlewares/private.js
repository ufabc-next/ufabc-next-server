const app = require('@/app')
const errors = require('@/errors')

const rule = require('@/helpers/routes/rule')

module.exports = rule(async (context) => {
  if(context.query.access_key != app.config.ACCESS_KEY) {
    throw new errors.Forbidden('ACCESS_KEY')
  }
})