const _ = require('lodash')
const mongoose = require('mongoose')

function pickIt(obj, fields) {
  if (_.isNil(obj)) {
    return {}
  }

  if (!_.isArray(fields)) {
    fields = [String(fields)]
  }

  if (_.isArray(obj)) {
    return obj.map(el => pickIt(el, fields))
  }

  let fieldGroups = _.groupBy((fields || []).sort().map(fieldPath), path => path[0])

  let out = {}

  for (let base in fieldGroups) {
    let fields = fieldGroups[base]

    let value = obj[base]

    if (_.isUndefined(value)) {
      // Skip
    } else if (fields.some(el => el.length == 1)) {
      out[base] = value
    } else if (_.isObject(value) || _.isArray(value) ) {
      out[base] = pickIt(value, fields.map(path => path.slice(1)))
    } else if (!_.isUndefined(value)){
      out[base] = value
    }
  }
  return out
}

function fieldPath(field) {
  return _.isArray(field) ? field : field.split('.')
}

// this function receives an object and the fields it should pick
// it walks recursively the fields to filter
module.exports = function pickFields(obj, fields, payload) {
  payload = payload || {}

  // make sure we are not converting a cyclic structure
  JSON.stringify(obj)

  // parse object Id to string
  if (_.isObject(obj) && mongoose.isObjectIdOrHexString(obj)) {
    return obj.toString()
  }

  // if passing an array
  if(_.isArray(obj)) {
    return _.map(obj, a => pickFields(a, fields, payload))
  }

  if(_.isObject(obj) && Object.keys(obj).length) {
    // filter the object first
    if(obj.toObject instanceof Function) obj = obj.toObject({ virtuals: true })

    const pickedFields = _.get(fields, 'public', null) || fields
    let resolvedFields = _.isFunction(pickedFields) ? pickedFields(payload) : pickedFields

    // get all keys
    if((resolvedFields || []).includes('*') || resolvedFields == null) {
      resolvedFields = Object.keys(obj)
    }

    // filter fields
    obj = pickIt(obj, resolvedFields || [])

    // iterate on object keys
    Object.keys(obj).forEach(key => {
      const nextFields = _.get(fields, key, null)

      // if it's an array, filter each item of the array
      if(_.isArray(obj[key])) {
        obj[key] = obj[key].map(item => pickFields(item, nextFields, payload))
        // if not, only filter
      } else {
        obj[key] = pickFields(obj[key], nextFields, payload)
      }
    })
  }

  return obj
}