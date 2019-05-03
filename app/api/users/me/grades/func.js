const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')

module.exports = async(context) => {
  const { user } = context

  let history = await app.models.histories.findOne({ ra : user.ra })

  if(!history) {
    throw new errors.NotFound('history')
  }

  const coefficients = history.coefficients || app.helpers.calculate.coefficients(history.disciplinas || [])

  return normalizeHistory(coefficients)
}

function normalizeHistory(history) {
  var total = []
  Object.keys(history).forEach(key => {
      const year = history[key]
      Object.keys(year).forEach(month => {
          total.push(_.extend(year[month], { 
            season: `${key}:${month}`, 
            quad: parseInt(month), 
            year: parseInt(key) 
          }))
      })
  })

  return total
}