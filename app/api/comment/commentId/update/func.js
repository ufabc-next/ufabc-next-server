const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {
  const Comment = app.models.comments

  const { commentId } = context.params

  app.helpers.validate.throwMissingParameter(['commentId'], context.params)

  let comment = await Comment.findOne({ _id: String(commentId) })

  if(!comment) throw new errors.BadRequest(`Analysis was not found: ${commentId}`)

  comment.set(_.pick(context.body, ['active']))

  return await comment.save()
}