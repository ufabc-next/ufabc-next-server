const app = require('@/app')
const _ = require('lodash')

module.exports = async (context) => {

  const { enrollmentId } = context.params
  const { ra } = context.user

  if(!ra) {
    return {}
  }

  app.helpers.validate.throwMissingParameter(['enrollmentId'], context.params)

  let res = await app.models.enrollments.findOne({ _id: String(enrollmentId) }, {
    conceito: 1,
    subject: 1,
    disciplina: 1,
    pratica: 1, 
    teoria: 1,
    year: 1,
    quad: 1,
    creditos: 1,
    updatedAt: 1,
    comments: 1,
  }).populate(['pratica', 'teoria', 'subject']).lean(true)

  let comment = await app.models.comments.find({ enrollment: String(enrollmentId) })
  comment.map((c) => {
    res[c.type]['comment'] = c
  })

  return _.omit(res, 'ra')
}