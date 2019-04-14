const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {

  const { teacherId } = context.params

  const { userId } = context.query

  if(!teacherId) throw new errors.BadRequest(`Missing teacherId: ${teacherId}`)

  if(!userId) throw new errors.BadRequest(`Missing userId: ${userId}`)

  const Analysis = app.models.analysis

  let analysis = await Analysis.analysisByReactions({ mainTeacher: teacherId }, userId)

  return analysis
}