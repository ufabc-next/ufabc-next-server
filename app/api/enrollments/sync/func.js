const _ = require('lodash')
const app = require('@/app')
const crypto = require('crypto')

module.exports = async function (context) {
  let { hash, year, quad } = context.body

  app.helpers.validate.throwMissingParameter(['year', 'quad'], context.body)
  const season = `${year}:${quad}`

  const Disciplinas = app.models.disciplinas.bySeason(season)
  const disciplinas = await Disciplinas.find({}, {
    identifier: 1,
    subject: 1,
    teoria: 1,
    pratica: 1,
  }).lean({ virtuals: true })
  
  const disciplinasMap = new Map([...disciplinas.map(d => [d.identifier, d])])

  const keys = ['ra', 'year', 'quad', 'disciplina']

  // parse disciplinas
  const enrollments = (await app.helpers.parse.pdf(context.body))
    .map(app.helpers.transform.disciplinas)
    .filter(enrollment => enrollment.ra && enrollment.disciplina)
    .map(e => _.extend(e, { year, quad }))
    .map(e => _.extend(e, {
      ...(_.omit(disciplinasMap.get(app.helpers.transform.identifier(e)) || {}, ['id', '_id'])),
      identifier: app.helpers.transform.identifier(e, keys),
      disciplina_identifier: app.helpers.transform.identifier(e),
    }))
  
  const enrollmentsHash = crypto.createHash('md5').update(JSON.stringify(enrollments)).digest('hex')
  if(enrollmentsHash != hash) {
    return {
      hash: enrollmentsHash,
      size: enrollments.length,
      sample: _.take(enrollments, 500)
    }
  }

  const chunks = _.chunk(enrollments, 3)
  
  app.agenda.now('updateEnrollments', { json: chunks[0] })
  app.agenda.schedule('in 1 minutes', 'updateEnrollments', { json: chunks[1] })
  app.agenda.schedule('in 2 minutes', 'updateEnrollments', { json: chunks[2] })

  return { published: true }
}
