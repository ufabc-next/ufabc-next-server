const _ = require('lodash')
const app = require('@/app')

module.exports = function (data, number) {
  let parsed =  app.helpers.parse.var2json(data)

  if(_.isArray(parsed)) {
    parsed = parsed.slice(0, number)
  } else if(_.isObject(parsed)) {
    let keys = Object.keys(parsed).slice(0, number)
    parsed = _.pick(parsed, keys)
  }

  return 'todas=' + JSON.stringify(parsed) + ';'
}