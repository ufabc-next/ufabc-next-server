const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {
  const Reaction = app.models.reactions

  const { user } = context
  const { commentId, kind } = context.params

  app.helpers.validate.throwMissingParameter(['kind', 'commentId'], context.params)

  return await Reaction.remove({
    comment: String(commentId),
    kind: kind,
    user: user._id,
    active: true
  })
}