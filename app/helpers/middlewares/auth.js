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
    console.log('DECODED JWT', user)

    req.user = await app.models.users.findOne({ _id: user.payload._id })
      
    } else {
      // Default is to throw...
      throw new errors.BadRequest('Header de autenticação inválido ou não fornecido')
    }


    next()
    // console.timeEnd('auth')
  } catch (e) {
    next(e) 
    // console.timeEnd('auth')
  }
}


module.exports.unless = unless