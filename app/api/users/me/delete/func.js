const app = require('@/app')
const errors = require('@/errors')

module.exports = async function(context){
  const User = app.models.users

  let user = await User.findOne({ _id: context.user._id, active: true })

  if(!user) throw new errors.BadRequest(`This user dont exist: ${context.user._id}`)

  user.active = false

  await user.save()

  return { status: 'ok', message: 'Foi bom te ter aqui =)'}
}