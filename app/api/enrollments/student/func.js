const app = require('@/app')

module.exports = async function (context) {
  const { ra } = context.user

  if(!ra) {
    return []
  }

  return await app.models.enrollments.find({
    ra,
    conceito: { $in: ['A', 'B', 'C', 'D', 'O', 'F'] },
  }, {
    conceito: 1,
    subject: 1,
    disciplina: 1,
    pratica: 1, 
    teoria: 1,
    year: 1,
    quad: 1
  }).populate(['pratica', 'teoria', 'subject']).lean(true)
}