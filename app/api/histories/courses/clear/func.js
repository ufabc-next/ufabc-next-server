const app = require('@/app')
const cachegoose = require('cachegoose')

module.exports = async function clearCacheKey(context) {
  let { season } = context.query

  if(!season) season = app.helpers.season.findSeasonKey()

  const cacheKey = `cursos_ids_${season}`

  cachegoose.clearCache(cacheKey)
}