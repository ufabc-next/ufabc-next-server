const _ = require('lodash')
const app = require('@/app')

module.exports = async function (context) {
  const season = app.helpers.season.findSeasonKey()
  const Disciplinas = app.models.disciplinas // .bySeason(season)

  const cacheKey = `todasDisciplinas_${season}`

  let cached =  await app.redis.cache.get(cacheKey)
  
  // if(cached){
  //   return cached
  // }

  return await Disciplinas.find({}).populate(['teoria', 'pratica']) // .lean(true)

  console.log(disciplinas[0])

  await app.redis.cache.set(cacheKey, disciplinas, '1d')
  return disciplinas
}