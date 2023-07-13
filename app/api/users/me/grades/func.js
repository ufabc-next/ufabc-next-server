const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')

module.exports = async(context) => {
  const { user } = context

  //This code is necessary for show data to performance page - get the coefficients from the last history
  //Example: users with BCT concluded and BCC in progress will have the BCC coefficients showed on the performance screen.
  const lastHistory = await app.models.historiesGraduations.findOne({ra: user.ra}).sort({createdAt: -1})

  //Next step 
  //Needs to add a querie to get the coefficients from the first historyGraduatiation and show that on the performance screen.


  if(!lastHistory) {
    throw new errors.NotFound('history')
  }

  let graduation = null
  if(lastHistory.curso && lastHistory.grade) {
    graduation = await app.models.graduation.findOne({
      curso: lastHistory.curso,
      grade: lastHistory.grade,
    }).lean(true)
  }

  const coefficients = lastHistory.coefficients || app.helpers.calculate.coefficients(lastHistory.disciplinas || [], graduation)

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