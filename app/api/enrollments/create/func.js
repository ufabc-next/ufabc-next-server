const _ = require('lodash')
const app = require('@/app')
const crypto = require('crypto')
const errors = require('@/errors')

module.exports = async function (context) {
  const { season, hash, teacherMappings, subjectMappings } = context.body
  let { enrollments } = context.body

  if(!season) {
    throw new errors.BadRequest.MissingParameter('season')
  }

  // get all teachers
  const ONE_HOUR = 60 * 60
  const teachers = await app.models.teachers.find({}).lean(true).cache(ONE_HOUR, 'teachers')
  const subjects = await app.models.subjects.find({}).lean(true).cache(ONE_HOUR, 'subjects')

  enrollments = enrollments
    .filter(d => d &&  Number.isInteger(parseInt(d.ra)))
    .map(app.helpers.transform.disciplinas)
    .map(d => _.merge(d, {
      teoria: app.helpers.transform.resolveProfessor(d.teoria, teachers, teacherMappings),
      pratica: app.helpers.transform.resolveProfessor(d.pratica, teachers, teacherMappings),
    }))

  const teacherErrors = app.helpers.validate.teachers(enrollments)
  const subjectErrors = app.helpers.validate.subjects(enrollments, subjects, subjectMappings)

  const enrollmentsHash = crypto.createHash('md5').update(JSON.stringify(enrollments)).digest('hex')
  if(enrollmentsHash != hash) {
    return {
      hash: enrollmentsHash,
      teacherErrors,
      subjectErrors,
      documents: enrollments.length
    }
  }

  app.redis.publish('enrollmentCreate', {
    season: season,
    enrollments: enrollments
  })

  return {
    status: 'published',
  }
}