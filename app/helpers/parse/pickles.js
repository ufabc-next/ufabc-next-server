const _ = require('lodash')
const mongoose = require('mongoose')

// this function receives an object and the fields it should pick
// it walks recursively the fields to filter
module.exports = function pickles(obj, fields) {
  if (fields == null) {
    return obj
  }

  // if passing an array
  if (_.isArray(obj)) {
    return _.map(obj, (a) => pickles(a, fields))
  }

  // mongoose.Types.ObjectId.isValid 
  if (_.isObject(obj) && !mongoose.isObjectIdOrHexString(obj)) {
    // filter the object first
    if (obj.toObject instanceof Function)
      obj = obj.toObject({
        getters: true,
        virtuals: true,
      })
    obj = _.pick(obj, fields.public)

    // iterate on object keys
    Object.keys(obj).forEach((key) => {
      // if it's an array, filter each item of the array
      if (_.isArray(obj[key])) {
        obj[key] = obj[key].map((item) => pickles(item, fields[key]))
        // if not, only filter
      } else {
        obj[key] = pickles(obj[key], fields[key])
      }
    })
  }

  return obj
}
