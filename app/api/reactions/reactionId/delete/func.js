const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {
  const Reaction = app.models.reactions
  const Comment = app.models.comments
  const User = app.models.users

  const { commentId } = context.params
  const { kind } = context.params

  app.helpers.validate.throwMissingParameter(['kind'], context.params)
  app.helpers.validate.throwMissingParameter(['commentId'], context.params)

  if(!context.user) throw new errors.BadRequest(`Missing user`)
  let comment = await Comment.findOne({ _id: String(commentId), active: true })
  if(!comment) throw new errors.BadRequest(`Comentário inválido: ${commentId}`)

  let user = await User.findOne({ _id: String(context.user._id) })
  if(!user) throw new errors.BadRequest(`Usuário inválido: ${context.user._id}`)

  let reaction = await Reaction.findOne({ comment: String(commentId), kind: kind, active: true })
  if(!reaction) throw new errors.BadRequest(`Nenhuma reação foi encontrada: ${reactionId}`)

  return await reaction.remove()
}