const _ = require('lodash')
const app = require('@/app')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const Model = module.exports = Schema({
  ra : Number,
  disciplinas: Object,
  coefficients: Object,
})

async function updateEnrollments(doc) {
  doc.disciplinas = _(doc.disciplinas).castArray().compact().value()
  doc.coefficients = app.helpers.calculate.coefficients(doc.disciplinas)

  const keys = ['ra', 'year', 'quad', 'disciplina']

  // calculate an identifier for all disciplinas on user history
  doc.disciplinas.map(d => {
    const key = {
      ra: doc.ra,
      year: d.ano,
      quad: d.periodo,
      disciplina: d.disciplina
    }

    d.identifier = d.identifier || app.helpers.transform.identifier(key, keys)
  })

  // check if user has an enrollment that does not have data
  let enrollments = await app.models.enrollments.find({
    $or: [
      {
        ra: doc.ra,
        cr_acumulado: { $exists: false },
      }, {
        ra: doc.ra,
        cr_acumulado: null,
      }, {
        ra: doc.ra,
        conceito: null,
      }, {
        ra: doc.ra,
        conceito: { $exists: false },
      }
    ]
  })

  // update enrollment information with user history information
  const promises = enrollments.map(async f => {
    let disc = _.find(doc.disciplinas, { identifier: app.helpers.transform.identifier(f, keys) })
    let acc = getLastPeriod(doc.coefficients, f.year, f.quad)

    // this means that disc was locked???
    if(!disc) {
      //console.log(f.disciplina, f.ra, f.year, f.quad)
    }

    const cacheKey = `help_${f.mainTeacher}`
    await app.redis.cache.del(cacheKey)

    _.extend(f, disc)
    _.extend(f, acc)
    return await f.save()
  })
  
  await Promise.all(promises)
}

Model.method('updateEnrollments', async function () {
  await updateEnrollments(this)
})

Model.pre('findOneAndUpdate', async function () {
  await updateEnrollments(this._update)
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