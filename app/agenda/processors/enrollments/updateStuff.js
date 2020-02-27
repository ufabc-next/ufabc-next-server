const app = require('@/app')

module.exports = function (agenda) {
  agenda.define('updateStuff', app.helpers.agenda.wrap(updateStuff))
}

async function updateStuff (payload) {
  const data = payload.json
  
  const ONE_HOUR = 60 * 60
  const teachers = await app.models.teachers.find({}).lean(true).cache(ONE_HOUR, 'teachers')

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
      await app.models.enrollments.findOneAndUpdate({
        identifier: identifier
      }, {
        teoria: app.helpers.transform.resolveProfessor(doc.teoria, teachers),
        pratica: app.helpers.transform.resolveProfessor(doc.pratica, teachers)
      }, {
        new: true,
        upsert: true
      })
    } catch(e) {
      // console.log(e)
    }



    // if(enrollment && enrollment.mainTeacher) {
    //   const cacheKey = `reviews_${enrollment.mainTeacher}`
    //   await app.redis.cache.del(cacheKey)
    // }

    // if(enrollment && enrollment.subject) {
    //   const cacheKey = `reviews_${enrollment.subject}`
    //   await app.redis.cache.del(cacheKey)
    // }

    // return enrollment
  }

  return app.helpers.mapLimit(data, updateEnrollments, 10)
}

module.exports.updateStuff = updateStuff