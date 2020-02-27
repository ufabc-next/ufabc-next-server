const app = require('@/app')

module.exports = async function () {
  const ONE_HOUR = 60 * 60
  return await app.models.teachers.find({}).lean(true).cache(ONE_HOUR, 'teachers')
}