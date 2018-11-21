const app = require('@/app')
const cachegoose = require('cachegoose')

module.exports = async function (payload) {
  const { season, enrollments } = payload

  const Enrollments = app.models.enrollments.bySeason(season)

  async function createEnrollments(enrollment){
    return await Enrollments.findOneAndUpdate({
      identifier: enrollment.identifier,
      quad: parseInt(enrollment.quad),
      year: parseInt(enrollment.year),
      ra: parseInt(enrollment.ra),
    }, enrollment, {
      upsert: true
    })
  }

  await app.helpers.mapLimit(enrollments, createEnrollments, 10)
}