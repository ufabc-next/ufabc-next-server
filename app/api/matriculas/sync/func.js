const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')
const Axios = require('axios')

module.exports = async(context, res) => {
  const season = app.helpers.season.findSeasonKey()
  const Disciplinas = app.models.disciplinas.bySeason(season)

  const { operation } = context.query

  // map possible operations
  const operationField = {
    'before_kick': 'before_kick',
    'after_kick' : 'after_kick',
    'sync': 'alunos_matriculados'
  }[operation] || 'alunos_matriculados'

  // check if we are doing a sync operation
  // update current enrolled students
  const isSync = operationField == 'alunos_matriculados'

  // fetch matriculas and parse into an undestandable way
  const matriculas = await Axios.get(app.config.MATRICULAS_URL)
  let payload = app.helpers.parse.var2json(matriculas.data)
  payload = app.helpers.transform.transformMatriculas(payload)

  async function updateAlunosMatriculados(id, payload) {
    const cacheKey = `disciplina_${season}_${id}`
    // only get cache result if we are doing a sync operation
    const cachedMatriculas = isSync
      ? await app.redis.cache.get(cacheKey)
      : {}

    // only update disciplinas that matriculas has changed
    if(_.isEqual(cachedMatriculas, payload[id])){
      return cachedMatriculas
    }

    // find and update disciplina
    const saved = await Disciplinas.findOneAndUpdate({
      disciplina_id: id
    }, { [operationField]: payload[id] }, {
      upsert: true,
      new: true
    })

    // save matriculas for this disciplina on cache if is sync operation
    isSync ? await app.redis.cache.set(cacheKey, payload[id]) : null
    return saved
  }
  
  const start = Date.now()
  await app.helpers.mapLimit(Object.keys(payload), updateAlunosMatriculados, 15, payload)

  return {
    status: 'ok',
    time: Date.now() - start,
  }
}
