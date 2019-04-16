const errors = require('@/errors')
const app = require('@/app')

module.exports = async function(context){
  const Comment = app.models.comments
  const Enrollment = app.models.enrollments

  if(!context.body.enrollment) throw new errors.BadRequest(`Missing enrollment`)

  if(!context.body.comment) throw new errors.BadRequest(`Missing comment`)

  let enrollment = await Enrollment.findById(String(context.body.enrollment))

  if(!enrollment) throw new errors.BadRequest(`This enrollment not exist: ${enrollment.id}`)

  let comment = new Comment({
    comment: String(context.body.comment),
    enrollment: enrollment.id,
    mainTeacher: enrollment.mainTeacher,
    disciplina: enrollment.disciplina,
    subject: enrollment.subject
  })

  return await comment.save()
}