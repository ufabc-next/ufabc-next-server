const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')
const Fields = require('../fields')

module.exports = async(context) => {
  const { token } = context.body
  const { user } = context.user

  //Decrypt func breaking for unknown reason
  console.log('TOKEN', token)
  console.log('USER', user)
  
  // let payload = {
  //   email: 'lucas-grippa@hotmail.com'
  // }

  // let user = await app.models.users.findOne({ 'oauth.email' : payload.email })

  if (!user) {
    throw new errors.NotFound('Usuário não encontrado: ')
  }

  user.set(_.pick(context.body, Fields.update))

  console.log("USER COMPLETE", user)

  // Save
  // try {
    await user.save()
  // } catch (e) {
  //   app.helpers.validate.mongoError(e)
  // }

  // Populate related objects
  return _.pick(user, Fields.public)
}