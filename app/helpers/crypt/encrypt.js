const app = require('@/app')
const crypto = require('crypto')

const ALGORITHM = 'aes-256-ctr'

module.exports = function encrypt(text){
  let cipher = crypto.createCipher(ALGORITHM, app.config.JWT_SECRET)
  let crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex')
  return crypted
}