const _ = require('lodash')
const ms = require('ms')
const app = require('@/app')

module.exports = async function getUsageStats(context) {
  let { season } = context.query
  if(!season) season = app.helpers.season.findSeasonKey()

  const Alunos = app.models.alunos.bySeason(season)

  return {
    users: await Alunos.count({}),
    help: await app.models.enrollments.count({ conceito: { $exists: true }})
  }
}