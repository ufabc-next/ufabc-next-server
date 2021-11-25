const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {
  const GradeSimulation = app.model.gradeSimulations;

  const { gradeSimulationId } = context.params

  app.helpers.validate.throwMissingParameter(['gradeSimulationId'], context.params)

  let gradeSimulation = await GradeSimulation.findOne({ _id: String(gradeSimulationId) })

  if(!gradeSimulation) throw new errors.BadRequest(`Simulação não encontrada: ${gradeSimulationId}`)

  gradeSimulation.active = false

  return await gradeSimulation.save()
}