const app = require('@/app')

module.exports = async function () {
  const season = app.helpers.season.findSeasonKey()
  const Disciplinas = app.models.disciplinas.bySeason(season)

  const cacheKey = `todasDisciplinas_${season}`

  let cached =  await app.redis.cache.get(cacheKey)
  
  if(cached){
    return cached
  }

  let disciplinas = await Disciplinas.find({}, {
    disciplina: 1,
    disciplina_id: 1,
    turno: 1,
    turma: 1,
    ideal_quad: 1,
    identifier: 1,
    subject: 1,

    vagas: 1,
    requisicoes: 1,
    teoria: 1,
    pratica: 1,
  }).populate(['teoria', 'pratica']).lean({ virtuals: true })

  await app.redis.cache.set(cacheKey, disciplinas, '1d')
  return disciplinas
}