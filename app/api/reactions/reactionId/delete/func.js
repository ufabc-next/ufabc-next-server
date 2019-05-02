const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {
  const Reaction = app.models.reactions

  const { user } = context
  const { commentId, kind } = context.params

  app.helpers.validate.throwMissingParameter(['kind', 'commentId'], context.params)

  let reaction = await Reaction.findOne({
    comment: String(commentId),
    kind: kind,
    user: user._id,
    active: true
  })

  if(!reaction) throw new errors.BadRequest(`Reação não encontrada no comentário: ${commentId}`)
  await reaction.remove()
}