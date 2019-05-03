const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')
const Fields = require('../fields')

module.exports = async(context) => {
  const { user } = context

  if (!user) {
    throw new errors.NotFound('Usuário não encontrado')
  }

  return _.pick(user, Fields.public)
}