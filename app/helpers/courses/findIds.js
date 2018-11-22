const _ = require('lodash')
const app = require('@/app')
const math = require('mathjs')

module.exports = async function findIds(season) {
  if(!season) season = app.helpers.season.findSeasonKey()

  const cacheKey = `cursos_ids_${season}`

  const Alunos = app.models.alunos.bySeason(season)

  let cursos = await Alunos
    .aggregate([
      { $unwind: "$cursos" },
      { $group: { _id: "$cursos.nome_curso", ids: { $push: "$cursos.id_curso" } } },
    ])
    .cache('1d', cacheKey)

  return cursos.map(curso => ({
    name: curso._id,
    curso_id: _.compact(curso.ids).length ? math.mode(_.compact(curso.ids))[0] : undefined
  }))
}