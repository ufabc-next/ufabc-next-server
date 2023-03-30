const app = require('@/app')
const errors = require('@/errors')

module.exports = async function (context) {
  const GradeSimulation = app.model.gradeSimulations;
  const { gradeSimulationId } = context.params
  const { grade, season } = context.body

  app.helpers.validate.throwMissingParameter('gradeSimulationId', context.params)
  app.helpers.validate.throwMissingParameter(['grade', 'season'], context.body)

  let gradeSimulation = await GradeSimulation.findOne({ _id: String(gradeSimulationId) })

  if (!gradeSimulation)
    throw new errors.BadRequest(`Simulação não encontrada: ${gradeSimulationId}`)

  gradeSimulation.grade = grade
  gradeSimulation.season = season
  gradeSimulation.year = season.split(':')[0]
  gradeSimulation.quad = season.split(':')[1]

  return await gradeSimulation.save()
}