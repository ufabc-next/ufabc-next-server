const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {
  const Analysis = app.models.analysis

  const { analysisId } = context.params

  if(!analysisId) throw new errors.BadRequest(`Missing analysisId`)

  let analysis = await Analysis.findOne({ _id: String(analysisId), active: true })

  if(!analysis) throw new errors.BadRequest(`Analysis was not found: ${analysisId}`)

  analysis.active = false

  return await analysis.save()
}