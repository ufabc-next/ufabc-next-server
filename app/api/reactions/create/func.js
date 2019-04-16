const errors = require('@/errors')
const app = require('@/app')

module.exports = async function(context){
  const Reaction = app.models.reactions
  const Comment = app.models.comments
  const User = app.models.users

  if(!context.body.kind) throw new errors.BadRequest(`Missing kind`)
  if(!context.body.user) throw new errors.BadRequest(`Missing user`)
  if(!context.body.comment) throw new errors.BadRequest(`Missing comment`)

  let comment = await Comment.findOne({ _id: String(context.body.comment), active: true })

  if(!comment) throw new errors.BadRequest(`Invalid comment: ${context.body.comment}`)

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