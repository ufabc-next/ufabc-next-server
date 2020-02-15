const assert = require('assert')
const unless = require('express-unless')
const jwt = require('jsonwebtoken')

const app = require('@/app')
const errors = require('@/errors')

const Forbidden = errors.Forbidden
const Unauthorized = errors.Unauthorized

module.exports = async (req, res, next) => {
  try {
    /*
     * Check for Bearer token (JWT format)
     */
    let authorization = req.headers.authorization
    if (authorization && authorization.startsWith('Bearer ')) {
      let tokenString = req.headers.authorization.replace('Bearer ', '')

      // verify user
      await jwt.verify(tokenString, app.config.JWT_SECRET)
      let user = jwt.decode(tokenString, { complete: true }) || {}

      req.user = await app.models.users.findOne({ _id: user.payload._id })

      if(!req.user.active) {
        throw new errors.BadRequest('Essa conta foi desativada')
      }
      
      // if(!req.user.confirmed) {
      //   throw new errors.Unauthorized('Usuário ainda não foi confirmado')
      // }

      if(!req.user) {
        throw new errors.Unauthorized('Usuário não existe ou foi desativado')
      }     

    } else {
      // Default is to throw...
      throw new errors.BadRequest('Header de autenticação inválido ou não fornecido')
    }

    next()
  } catch (e) {
    next(e)
  }
}


module.exports.unless = unless
