const app = require('@/app')
const cachegoose = require('cachegoose')

module.exports = async function (context) {
  const teacher = await app.models.teachers.create(context.body)
  cachegoose.clearCache('teachers')

  return teacher
}