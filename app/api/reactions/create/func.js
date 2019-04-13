const errors = require('@/errors')
const app = require('@/app')

module.exports = async function(context){
  const Reaction = app.models.reactions
  const Analysis = app.models.analysis
  const User = app.models.users

  if(!context.body.kind) throw new errors.BadRequest(`Missing kind`)
  if(!context.body.user) throw new errors.BadRequest(`Missing user`)
  if(!context.body.analysis) throw new errors.BadRequest(`Missing analysis`)

  let analysis = await Analysis.findOne({ _id: String(context.body.analysis), active: true })

  if(!analysis) throw new errors.BadRequest(`Invalid analysis: ${context.body.analysis}`)

  let user = await User.findOne({ _id: String(context.body.user) })

  if(!user) throw new errors.BadRequest(`Invalid user: ${context.body.user}`)

  let reaction = new Reaction({
    kind: context.body.kind,
    analysis: analysis,
    user: user,
  })

  reaction = await reaction.save()

  return reaction
}