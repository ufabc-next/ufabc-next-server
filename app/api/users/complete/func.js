const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')
const Fields = require('../fields')

module.exports = async(context) => {
  const { user } = context

  if (!user) {
    throw new errors.NotFound('Usuário não encontrado')
  }

  user.set(_.pick(context.body, Fields.update))
  user.confirmed = true
  
  // Save
  try {
    await user.save()
  } catch (e) {
    app.helpers.validate.mongoError(e)
  }

  return _.pick(user, Fields.public)
}