const app = require('@/app')

module.exports = async function () {
  const season = app.helpers.season.findSeasonKey()
  const Disciplinas = app.models.disciplinas.bySeason(season)

  const cacheKey = `todasDisciplinas_${season}`
  await app.redis.cache.del(cacheKey)
}