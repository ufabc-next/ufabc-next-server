const app = require('@/app')

module.exports = async function (context) {
  const historiesGraduationIds = await app.models.historiesGraduations.find({ ra: context.user.ra}).select("_id")
  const intendedGraduationIds = await app.models.intendedGraduation.find({ user: context.user._id, active: true }).select("_id")

  const result = [...historiesGraduationIds,...intendedGraduationIds]

  return result
}