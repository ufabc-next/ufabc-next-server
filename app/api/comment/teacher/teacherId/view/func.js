const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {

  const { teacherId } = context.params

  const { userId } = context.query

  if(!teacherId) throw new errors.BadRequest(`Missing teacherId: ${teacherId}`)

  if(!userId) throw new errors.BadRequest(`Missing userId: ${userId}`)

  const Comment = app.models.comment

  let comment = await Comment.commentsByReactions({ mainTeacher: teacherId }, userId)

  return comment
}