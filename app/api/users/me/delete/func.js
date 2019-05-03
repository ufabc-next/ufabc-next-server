const app = require('@/app')

module.exports = async function(context){
  const User = app.models.users

  let user = await User.findOne(context.user._id)

  await user.remove()

  return { status: 'ok', message: 'Foi bom te ter aqui =)'}
}