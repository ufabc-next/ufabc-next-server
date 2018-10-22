const app = require('@/app')

module.exports = async function scores() {
  // get teacher score
  const cacheKey = `ufacbhelp_scores`
  let cachedTeachers = await app.redis.cache.get(cacheKey)

  if(!cachedTeachers) {
    cachedTeachers = await app.models.ufabchelp.find({}).lean(true)
    await app.redis.cache.set(cacheKey, cachedTeachers, '2d')
  }

  return cachedTeachers
}