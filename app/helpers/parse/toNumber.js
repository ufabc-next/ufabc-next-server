const _ = require('lodash')

module.exports = function toNumber(str) {
  if(_.isNumber(str)) return str
  return parseFloat((str || '').replace(',', '.'))
}