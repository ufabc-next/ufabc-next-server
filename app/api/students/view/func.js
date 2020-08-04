const app = require('@/app')
const errors = require('@/errors')
const _ = require('lodash')

module.exports = async(context) => {
  const { ra } = context.user

  if(!ra) {
    throw new errors.BadRequest.MissingParameter('ra')
  }
  const season = app.helpers.season.findSeasonKey()
  const Alunos = app.models.alunos.bySeason(season)

  return _.pick(await Alunos.findOne({
    ra: ra,
  }), 'aluno_id')
}