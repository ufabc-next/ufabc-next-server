const _ = require('lodash')
const app = require('@/app')

module.exports = async function (context) {
  const { ra } = context.body

  if(!ra) {
    return
  }

  return await app.models.histories.findOneAndUpdate({
    ra: ra
  }, context.body, {
    upsert: true
  })
}