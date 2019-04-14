const errors = require('@/errors')
const app = require('@/app')

module.exports = async function(context){
  const Analysis = app.models.analysis
  const Enrollment = app.models.enrollments

  if(!context.body.enrollment) throw new errors.BadRequest(`Missing enrollment`)

  if(!context.body.comment) throw new errors.BadRequest(`Missing comment`)

  let enrollment = await Enrollment.findById(String(context.body.enrollment))

  if(!enrollment) throw new errors.BadRequest(`This enrollment not exist: ${enrollment.id}`)

  let analysis = new Analysis({
    comment: String(context.body.comment),
    identifier: enrollment.identifier,
    enrollment: enrollment.id,
    mainTeacher: enrollment.mainTeacher,
    subject: enrollment.subject
  })

  analysis = await analysis.save()

  return analysis
}