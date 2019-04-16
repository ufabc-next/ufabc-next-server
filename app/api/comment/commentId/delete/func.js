const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {
  const Comment = app.models.comments

  const { commentId } = context.params

  if(!commentId) throw new errors.BadRequest(`Missing commentId`)

  let comment = await Comment.findOne({ _id: String(commentId), active: true })

  if(!comment) throw new errors.BadRequest(`Analysis was not found: ${commentId}`)

  comment.active = false

  return await comment.save()
}