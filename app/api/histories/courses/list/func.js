const cachegoose = require('cachegoose')

module.exports = async function clearCacheKey(context) {
  let { season } = context.query

  if(!season) season = app.helpers.season.findSeasonKey()

  return await app.helpers.courses.findIds(season)
}