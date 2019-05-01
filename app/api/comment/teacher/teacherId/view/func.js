const app = require('@/app')
const errors = require('@/errors')
const _ = require('lodash')

module.exports = async (context) => {

  const { teacherId, subjectId } = context.params
  let { limit, page } = _.defaults(context.query, {
    limit: 10,
    page: 0,
  })

  const userId = context.user._id

  const Comment = app.models.comments

  app.helpers.validate.throwMissingParameter(['teacherId'], context.params)

  if(!userId) throw new errors.BadRequest(`Missing userId: ${userId}`)

  let comment = await Comment.commentsByReactions({ 
    teacher: teacherId, 
    ...( subjectId && { subject: subjectId }) 
  }, userId)

  return comment
}