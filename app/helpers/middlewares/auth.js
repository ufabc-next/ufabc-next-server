const _ = require('lodash')
const Axios = require('axios')
const assert = require('assert')
const unless = require('express-unless')

const app = require('../../app')
const errors = require('../../errors')

const Forbidden = errors.Forbidden
const Unauthorized = errors.Unauthorized

// only studnts
module.exports = async (req, res, next) => {
  // Find aluno-id header
  let aluno = null
  if ('aluno_id' in req.headers) {
    aluno = req.headers['aluno_id']
  } else if ('x-aluno_id' in req.headers) {
    aluno = req.headers['x-aluno_id']
  } else if (req.query && '_aluno_id' in req.query) {
    aluno = req.query['_aluno_id']
  } else {
    // Bad request if no header was found
    let error = new errors.BadRequest('Você deve especificar o header `aluno-id`')
    return next(error)
  }

  req.aluno = await app.models.aluno.findOne({ aluno_id: aluno })
}


module.exports.unless = unless
