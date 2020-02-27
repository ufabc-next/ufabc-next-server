const app = require('@/app')
const cachegoose = require('cachegoose')

module.exports = async function (context) {
  const subject = await app.models.subjects.create(context.body)
  cachegoose.clearCache('subjects')

  return subject
}