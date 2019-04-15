const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {

  const { teacherId } = context.params

  const { userId, disciplina } = context.query

  if(!teacherId) throw new errors.BadRequest(`Missing teacherId: ${teacherId}`)

  if(!userId) throw new errors.BadRequest(`Missing userId: ${userId}`)

  if(!disciplina) throw new errors.BadRequest(`Missing disciplina: ${disciplina}`)

  const Analysis = app.models.analysis

  let analysis = await Analysis.analysisByReactions({ mainTeacher: teacherId, disciplina: disciplina }, userId )

  return analysis
}