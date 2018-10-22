const _ = require('lodash')
const app = require('@/app')

module.exports = async function (context) {
  const { q } = context.query

  const regex = new RegExp(escapeRegex(q || ''), 'gi')

  return await app.models.subjects.find({ search: regex }).limit(10).lean(true)
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}