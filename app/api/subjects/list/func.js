const _ = require('lodash')
const app = require('@/app')

module.exports = async function (context) {
  const ONE_HOUR = 60 * 60
  return await app.models.subjects.find({}).lean(true).cache('subjects', ONE_HOUR)
}