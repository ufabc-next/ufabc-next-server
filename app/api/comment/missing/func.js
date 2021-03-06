const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {
  const { userId } = context.params

  app.helpers.validate.throwMissingParameter(['userId'], context.params)

  const Comment = app.models.comments

  const Enrollment = app.models.enrollments

  const User = app.models.users

  let user = await User.findOne({ _id: userId, active: true })

  if(!user) throw new errors.BadRequest(`Usuário inválido: ${userId}`)

  let enrollments = await Enrollment.find({ ra: user.ra })

  let resp = []

  let comments = (await Comment.find({ ra: user.ra }).lean(true)).map(comment =>  {
    return String(comment.enrollment)
  })

  enrollments.map(enroll => {
    if(!comments.includes(enroll.id)) {
      resp.push(enroll)
    }
  })

  return resp
}