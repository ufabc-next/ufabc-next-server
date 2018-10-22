/*
 * This method is responsible for parsing an input and perhaps,
 * throwing errors to the application with the converted error
 * type.
 *
 * For instance, Mongo uses custom internal errors such as 
 * 'ValidationError'. We then convert it to our own type of error
 * best for Requests and make them a 401 instead of 500 when 
 * throwing them during request error handling 
 *
 * See: helpers/middlewares/errors for details on handling errors
 * 
 */

var _ = require('lodash')
var errors = require('@/errors')

module.exports = (maybeError) => {
  if (maybeError == null)
    return

  // Call self recursivelly if in an array
  if (_.isArray(maybeError)) {
    maybeError.map(module.exports)
    return
  }

  if (maybeError.name == 'ValidationError') {
    throw new errors.BadRequest.InvalidParameter(maybeError.message)
  }

  if(maybeError.code == 11000) {
    let firstSplit = _.get(maybeError.message.split('index: '), '1' , '')
    let secondSplit = _.get(firstSplit.split('dup key'), '0')
    let index = secondSplit.replace(/\s/g,'').split('_').filter(a => a != '1')
    let last = index[index.length - 1]
    throw new errors.Conflict(last)
  }

  throw maybeError
}