const app = require('@/app')
const errors = require('@/errors')

module.exports = async function (context) {
  const GradeSimulation = app.model.gradeSimulations;
  const HistoryGraduation = app.model.historiesGraduations;
  const { historyGraduationId, subject, grade, season } = context.body

  app.helpers.validate.throwMissingParameter(['historyGraduationId', 'subject', 'grade', 'season'], context.body)

  const historyGraduation = await HistoryGraduation.findOne({ _id: String(historyGraduationId) })

  if (!historyGraduation)
    throw new errors.BadRequest(
      `Histórico não encontrado: ${historyGraduationId}`
    );

  // Validate if historyGraduation contains subject
  if (historyGraduation.disciplinas.filter(d => d._id == subject).length == 0)
    throw new errors.BadRequest(
      `Subject não encontrado: ${subject}`
    );

  return await GradeSimulation.create(filter, {
    subject: subject,
    historyGraduation: historyGraduation.id,
    grade: grade,
    season: season,
    year: season.split(':')[0],
    quad: season.split(':')[1],
  })
}