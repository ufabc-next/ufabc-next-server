const _ = require('lodash')
const app = require('@/app')

module.exports = async function (context) {
  const ONE_HOUR = 60 * 60
  return await app.models.teachers.find({}).lean(true).cache(ONE_HOUR, 'teachers')
}