const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {
  const Reaction = app.models.reactions

  const { reactionId } = context.params

  if(!reactionId) throw new errors.BadRequest(`Missing reactionId`)

  let reaction = await Reaction.findOne({ _id: String(reactionId), active: true })

  if(!reaction) throw new errors.BadRequest(`Reaction was not found: ${reactionId}`)

  return await reaction.remove()
}