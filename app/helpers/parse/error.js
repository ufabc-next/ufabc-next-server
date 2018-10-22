const _ = require('lodash')

const errors = require('@/errors')

module.exports = (err) => {
  const MappingErrors = [
    { status: 400, name: 'BadRequest',    class: errors.BadRequest },
    { status: 401, name: 'Unauthorized',  class: errors.Unauthorized },
    { status: 403, name: 'Forbidden',     class: errors.Forbidden },
    { status: 404, name: 'NotFound',      class: errors.NotFound },
    { status: 409, name: 'Conflict',      class: errors.Conflict },
    { status: 422, name: 'Unprocessable', class: errors.Unprocessable },
  ]

  // support for passing tendaEdu errors up
  if(_.find(MappingErrors, { name: err.type, status: err.status })) return err

  let errorClass = _.find(MappingErrors, maybe => err instanceof maybe.class)

  // Defaults to FatalError
  errorClass = errorClass || { status: 500, name: 'FatalError' }

  let parsed = {
    status: errorClass.status,
    name: errorClass.name,
    type: err.name,
    error: parseSafely(err.message),
  }

  return parsed
}

function parseSafely(message) {
  try {
    return JSON.parse(message)
  } catch(e) {
    return message
  }
}