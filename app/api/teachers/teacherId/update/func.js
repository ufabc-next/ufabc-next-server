const _ = require('lodash')
const app = require('@/app')
const cachegoose = require('cachegoose')

module.exports = async function (context) {
  const { teacherId } = contex.params
  const { alias } = context.body

  const teacher = await app.models.teachers.findOneAndUpdate({
    _id: teacherId
  }, {
    alias
  })
  cachegoose.clearCache('teachers')

  return teacher
}