const app = require('@/app')
const crypto = require('crypto')

const ALGORITHM = 'aes-256-ctr'

module.exports = function decrypt(text){
  let decipher = crypto.createDecipher(ALGORITHM, app.config.JWT_SECRET)
  let dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8')
  return dec
}