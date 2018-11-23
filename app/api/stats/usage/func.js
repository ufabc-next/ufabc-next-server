const _ = require('lodash')
const app = require('@/app')

module.exports = async function findIds(season) {
  if(!season) season = app.helpers.season.findSeasonKey()

  const Alunos = app.models.alunos.bySeason(season)

  return {
    users: await Alunos.count({}).cache('2m'),
    help: await app.models.enrollments.count({ conceito: { $exists: true }}).cache('2m')
  }
}