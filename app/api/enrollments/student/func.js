const app = require('@/app')

module.exports = async function (context) {
  const { ra } = context.query

  if(!ra) {
    return
  }

  return await app.models.enrollments.find({
    ra
  }).populate(['pratica', 'teoria', 'subject']).lean(true)
}