const _ = require('lodash')
const app = require('@/app')
const crypto = require('crypto')

module.exports = async function (context) {
  let { mappings, hash } = context.body

  const season = context.body.season || app.helpers.season.findSeasonKey()
  const Disciplinas = app.models.disciplinas.bySeason(season)

  // get all teachers
  const ONE_HOUR = 60 * 60
  const teachers = await app.models.teachers.find({}).lean(true).cache(ONE_HOUR, 'teachers')

  // parse disciplinas
  let disciplinas = (await app.helpers.parse.pdf(context.body))
    .map(app.helpers.transform.disciplinas)
    .map(d => _.merge(d, {
      teoria: app.helpers.transform.resolveProfessor(d.teoria, teachers, mappings),
      pratica: app.helpers.transform.resolveProfessor(d.pratica, teachers, mappings),
    }))

  // check which teachers from pdf or xls are missing
  const errors = app.helpers.validate.teachers(disciplinas)
 
  // create hash
  const disciplinaHash = crypto.createHash('md5').update(JSON.stringify(disciplinas)).digest('hex')
  if(disciplinaHash != hash) {
    return {
      hash: disciplinaHash,
      payload: disciplinas,
      errors: _.uniq(errors)
    }
  }

  const identifierKeys = ['disciplina', 'turno', 'campus', 'turma'] 

  async function updateDisciplinas(disciplina){
    // find and update disciplina
    return await Disciplinas.findOneAndUpdate({
      identifier: app.helpers.transform.identifier(disciplina, identifierKeys)
    }, {
      teoria: _.get(disciplina.teoria, '_id', null),
      pratica: _.get(disciplina.pratica, '_id', null)
    }, {
      new: true,
    })
  }

  const start = Date.now()
  disciplinas = await app.helpers.mapLimit(disciplinas, updateDisciplinas, 15)
  
  // clear cache for this season
  const cacheKey = `todasDisciplinas_${season}`
  await app.redis.cache.del(cacheKey)

  return {
    status: 'ok',
    time: Date.now() - start,
  }
}