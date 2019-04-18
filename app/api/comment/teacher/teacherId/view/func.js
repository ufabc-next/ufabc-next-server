const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {

  const { teacherId, subjectId } = context.params

  const { userId } = context.query // TODO pegar da auth do grippa  

  const Comment = app.models.comments

  if(!teacherId) throw new errors.BadRequest(`Missing teacherId: ${teacherId}`)

  if(!userId) throw new errors.BadRequest(`Missing userId: ${userId}`)  

  let comment = await Comment.commentsByReactions({ mainTeacher: teacherId, ...( subjectId && { subject: subjectId}) }, userId)

  return comment
}