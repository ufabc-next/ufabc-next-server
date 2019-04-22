const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {
  const Reaction = app.models.reactions

  const { reactionId } = context.params

  app.helpers.validate.throwMissingParameter(['reactionId'], context.params)

  let reaction = await Reaction.findOne({ _id: String(reactionId), active: true })

  if(!reaction) throw new errors.BadRequest(`Nenhuma reação foi encontrada: ${reactionId}`)

  return await reaction.remove()
}