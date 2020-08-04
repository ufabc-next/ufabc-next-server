const app = require('@/app')
const errors = require('@/errors')
const _ = require('lodash')

module.exports = async(context) => {
  const { ra } = context.params
  const { login } = context.body

  if(!ra) {
    throw new errors.BadRequest.MissingParameter('ra')
  }

  if(!login) {
    throw new errors.BadRequest.MissingParameter('login')
  }
  const season = app.helpers.season.findSeasonKey()
  const Alunos = app.models.alunos.bySeason(season)

  return _.pick(await Alunos.findOne({
    ra: ra,
    login: login
  }), 'aluno_id')
}