const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {
  const Comment = app.models.comments

  const { commentId } = context.params

  if(!commentId) throw new errors.BadRequest(`Missing commentId`)

  let comment = await Comment.findOne({ _id: String(commentId) })

  if(!comment) throw new errors.BadRequest(`Analysis was not found: ${commentId}`)

  comment.set(_.pick(context.body, ['comment', 'active']))

  return await comment.save()
}