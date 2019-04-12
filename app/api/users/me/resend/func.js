const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')

module.exports = async(context) => {
  const user = await app.models.users.findOne({ _id: context.user._id })

  if(!user) {
    throw new errors.NotFound('user')
  }

  await user.sendConfirmation()
}