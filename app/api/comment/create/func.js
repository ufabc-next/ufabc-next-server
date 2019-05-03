const app = require('@/app')
const errors = require('@/errors')
const Fields = require('@/api/comment/Fields')
const pickFields = require('@/helpers/parse/pickFields')

module.exports = async function(context){
  const Comment = app.models.comments
  const Enrollment = app.models.enrollments

  app.helpers.validate.throwMissingParameter(['enrollment', 'comment', 'type'], context.body)

  let enrollment = await Enrollment.findById(String(context.body.enrollment))

  if(!enrollment) throw new errors.BadRequest(`Este vínculo não existe: ${enrollment.id}`)

  return pickFields(await Comment.create({
    comment: String(context.body.comment),
    type: context.body.type,
    enrollment: enrollment.id,
    teacher: enrollment[context.body.type],
    disciplina: enrollment.disciplina,
    subject: enrollment.subject,
    ra: enrollment.ra
  }), Fields)
}