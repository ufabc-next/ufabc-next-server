const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')
const Axios = require('axios')

module.exports = async(context, res) => {
  const season = app.helpers.season.findSeasonKey()
  const Disciplinas = app.models.disciplinas.bySeason(season)

  const disciplinas = await Axios.get(app.config.DISCIPLINAS_URL)
  const payload = app.helpers.parse
    .var2json(disciplinas.data)
    .map(app.helpers.transform.disciplinas)

  // get all subjects
  const ONE_HOUR = 60 * 60
  const subjects = await app.models.subjects.find({}).lean(true).cache('subjects', ONE_HOUR)

  // check if subjects actually exists before creating the relation
  const err = app.helpers.validate.subjects(payload, subjects)
  
  if(err.length) {
    throw new errors.BadRequest(_.uniq(err))
  }
    
  async function updateDisciplinas(disciplina){  
    // find and update disciplina
    return await Disciplinas.findOneAndUpdate({
      disciplina_id: disciplina.disciplina_id
    }, disciplina, {
      upsert: true,
      new: true
    })
  }

  const start = Date.now()
  await app.helpers.mapLimit(payload, updateDisciplinas, 15)

  // clear cache for this season
  const cacheKey = `todasDisciplinas_${season}`
  await app.redis.cache.del(cacheKey)

  return {
    status: 'ok',
    time: Date.now() - start,
  }
}
