const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context) => {
  const Analysis = app.models.analysis

  const { analysisId } = context.params

  if(!analysisId) throw new errors.BadRequest(`Missing analysisId`)

  let analysis = await Analysis.findOne({ _id: String(analysisId) })

  if(!analysis) throw new errors.BadRequest(`Analysis was not found: ${analysisId}`)

  analysis.set(_.pick(context.body, ['comment', 'active']))

  return await analysis.save()
}