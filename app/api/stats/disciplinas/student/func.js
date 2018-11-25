const _ = require('lodash')
const app = require('@/app')

module.exports = async function getDisciplinasByStudent(context) {
  let { season } = context.query

  if(!season) season = app.helpers.season.findSeasonKey()
  const Disciplinas = app.models.disciplinas.bySeason(season)

  // check if we are dealing with previous data or current
  const isPrevious = await Disciplinas.count({ before_kick: { $exists: true, $ne: [] }})
  const dataKey = isPrevious ? "$before_kick" : "$alunos_matriculados"

  return Disciplinas.aggregate([
    { $unwind: dataKey },
    { $group : { _id : dataKey, count : { $sum : 1 } } },
    { $group : { _id : '$count', students_number : { $sum : 1 } } },
    { $sort: { _id: 1 } },
    { $project:
      {
        students_number: 1,
        disciplines_number: "$_id"
      }
    }
  ])
}