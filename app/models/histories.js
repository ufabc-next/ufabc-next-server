const _ = require('lodash')
const app = require('@/app')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const Model = module.exports = Schema({
  ra : Number,
  disciplinas: Object,
  coefficients: Object,

  curso: String,
  grade: String
})

async function updateEnrollments(doc) {
  // if we are not updating or have disciplinas, returns right away
  if(!doc.disciplinas) {
    return
  }

  doc.disciplinas = _(doc.disciplinas).castArray().compact().value()
  doc.coefficients = app.helpers.calculate.coefficients(doc.disciplinas)

  const keys = ['ra', 'year', 'quad', 'disciplina']

  async function createOrUpdateEnrollment(d) {
    const key = {
      ra: doc.ra,
      year: d.ano,
      quad: d.periodo,
      disciplina: d.disciplina
    }

    // calculate identifier for this discipline
    d.identifier = d.identifier || app.helpers.transform.identifier(key, keys)

    // find coef for this period
    const coef = getLastPeriod(doc.coefficients, parseInt(d.ano), parseInt(d.periodo))

    // find subjects
    const ONE_HOUR = 60 * 60
    const subjects = await app.models.subjects.find({}).lean(true).cache(ONE_HOUR, 'subjects')

    // create enrollment payload
    const enrollmentPayload = {
      ra: key.ra,
      year: key.year,
      quad: key.quad,
      disciplina: key.disciplina,
      conceito: d.conceito,
      creditos: d.creditos,
      cr_acumulado: _.get(coef, 'cr_acumulado'),
      ca_acumulado: _.get(coef, 'ca_acumulado')
    }

    // find subject for this enrollment
    app.helpers.validate.subjects(enrollmentPayload, subjects, {})

    // check if a enrollment already exists for this
    const enrollment = await app.models.enrollments.findOneAndUpdate({
      identifier: d.identifier
    }, enrollmentPayload, {
      new: true,
      upsert: true
    })

    if(enrollment.mainTeacher) {
      const cacheKey = `reviews_${enrollment.mainTeacher}`
      await app.redis.cache.del(cacheKey)
    }

    if(enrollment.subject) {
      const cacheKey = `reviews_${enrollment.subject}`
      await app.redis.cache.del(cacheKey)
    }
  }

  await app.helpers.mapLimit(doc.disciplinas, createOrUpdateEnrollment, 10)
}

Model.method('updateEnrollments', async function () {
  await updateEnrollments(this)
})

Model.pre('findOneAndUpdate', async function () {
  await updateEnrollments(this._update)
})

Model.post('save', async function () {
  await updateEnrollments(this)
})

function getLastPeriod(disciplines, year, quad, begin) {
  if(!begin) {
    let firstYear = Object.keys(disciplines)[0]
    let firstMonth = Object.keys(disciplines[firstYear])[0]
    begin = `${firstYear}.${firstMonth}`
  }

  if(quad == 1) {
    quad = 3
    year -= 1
  } else if (quad == 2 || quad == 3) {
    quad -= 1
  }

  if(begin > `${year}.${quad}`) {
    return null
  }

  let resp = _.get(disciplines, `${year}.${quad}`, null)
  if(resp == null) {
    return getLastPeriod(disciplines, year, quad, begin)
  }

  return resp
}