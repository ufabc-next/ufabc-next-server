const _ = require('lodash')
const errors = require('@/errors')

module.exports = function throwMissingParameter(fields, obj) {
  fields = _.castArray(fields)

  fields.forEach(field => {
    let exists = field in obj
    if(!exists) throw new errors.BadRequest.MissingParameter(field)
  })
}