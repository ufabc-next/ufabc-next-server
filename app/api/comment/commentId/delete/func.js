const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {
  const Comment = app.models.comments

  const { commentId } = context.params

  app.helpers.validate.throwMissingParameter(['commentId'], context.params)

  let comment = await Comment.findOne({ _id: String(commentId), active: true })

  if(!comment) throw new errors.BadRequest(`Comentário não encontrado: ${commentId}`)

  comment.active = false

  return await comment.save()
}