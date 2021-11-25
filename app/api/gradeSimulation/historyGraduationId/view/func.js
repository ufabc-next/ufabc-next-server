const _ = require('lodash')
const app = require('@/app')

module.exports = async function (context) {
  const GradeSimulation = app.model.gradeSimulations;
  const { historyGraduationId } = context.params
  const season = app.helpers.season.findSeasonKey()

  app.helpers.validate.throwMissingParameter('historyGraduationId', context.params)

  return await GradeSimulation
    .find({
      active: true,
      historyGraduation: String(historyGraduationId),
      $or: [
        { year: { "$gt": season.year } },
        {
          year: season.year,
          quad: { "$gt": season.quad }
        },
      ],
    }).populate("subject").lean(true)
}