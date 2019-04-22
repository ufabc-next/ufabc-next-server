const errors = require('@/errors')
const app = require('@/app')

module.exports = async function(context){
  const Comment = app.models.comments
  const Enrollment = app.models.enrollments

  app.helpers.validate.throwMissingParameter(['enrollment', 'comment'], context.body)

  let enrollment = await Enrollment.findById(String(context.body.enrollment))

  if(!enrollment) throw new errors.BadRequest(`Este vínculo não existe: ${enrollment.id}`)

  let comment = new Comment({
    comment: String(context.body.comment),
    enrollment: enrollment.id,
    mainTeacher: enrollment.mainTeacher,
    disciplina: enrollment.disciplina,
    subject: enrollment.subject
  })

  return await comment.save()
}