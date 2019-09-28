const _ = require('lodash');
const app = require('@/app')

module.exports = function (agenda) {
  agenda.define('updateEnrollments', app.helpers.agenda.wrap(updateEnrollments))
}

async function updateEnrollments (payload) {
  const data = payload.json

  let count = 1

  async function updateEnrollments(doc) {
    console.log('document', count++, doc.ra)
    const keys = ['ra', 'year', 'quad', 'disciplina']

    const key = {
      ra: doc.ra,
      year: doc.year,
      quad: doc.quad,
      disciplina: doc.disciplina
    }

    const identifier = app.helpers.transform.identifier(key, keys)

    try {
      // check if a enrollment already exists for this
      const enrollment = await app.models.enrollments.findOneAndUpdate({
        identifier: identifier
      }, _.omit(doc, ['identifier', 'id', '_id']), {
        new: true,
        upsert: true
      })
    } catch(e) {
      // console.log(e)
    }
  }

  return app.helpers.mapLimit(data, updateEnrollments, 10)
}

module.exports.updateEnrollments = updateEnrollments