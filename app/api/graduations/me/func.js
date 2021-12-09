const app = require('@/app')

module.exports = async function (context) {
  // historiesGraduations refere ao historico de progressao do aluno no curso (ex no BCT)
  // graduation equivale ao dominio de todos os cursos e seus respectivos projetos pedagogicos
  //
  // queries em historiesGraduations e intendedGraduation filtrado pelo aluno para obter o(s) graduationId(s)
  // union das queries
  // query em graduations
  // if(intendedGraduation) throw new errors.BadRequest(`Inteded graduation already selected for this user.`)
  
  const historiesGraduationIds = await app.models.historiesGraduations.find({ ra: context.user.ra}).select("_id")
  const intendedGraduationIds = await app.models.intendedGraduation.find({ user: context.user._id, active: true }).select("_id")

  const result = [...historiesGraduationIds,...intendedGraduationIds]

  //const intendedGraduation = await app.models.intendedGraduation.find({})
  // const newintendedGraduation = await app.models.intendedGraduation.create(context.body)

  return result
}