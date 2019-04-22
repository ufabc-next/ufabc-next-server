const errors = require('@/errors')
const app = require('@/app')

module.exports = async function(context){
  const Reaction = app.models.reactions
  const Comment = app.models.comments
  const User = app.models.users

  const { commentId } = context.params

  app.helpers.validate.throwMissingParameter(['kind'], context.body)
  app.helpers.validate.throwMissingParameter(['commentId'], context.params)

  if(!context.body.user) throw new errors.BadRequest(`Missing user`) // TODO PEGAR DO AUTH DO GRIPPA

  let comment = await Comment.findOne({ _id: String(commentId), active: true })

  if(!comment) throw new errors.BadRequest(`Invalid comment: ${commentId}`)

  let user = await User.findOne({ _id: String(context.body.user) })

  if(!user) throw new errors.BadRequest(`Invalid user: ${context.body.user}`)

  let reaction = new Reaction({
    kind: context.body.kind,
    comment: comment,
    user: user,
  })

  reaction = await reaction.save()

  return reaction
}