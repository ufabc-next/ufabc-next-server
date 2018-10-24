const _ = require('lodash')
const app = require('@/app')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

module.exports = async function (context) {
  const { ra } = context.body

  if(!ra) {
    return
  }

  const history = await app.models.histories.findOneAndUpdate({
    ra: ra
  }, context.body, {
    upsert: true,
    new: true
  })

  const payload = {
    ra: history.ra,
    hash: crypto.createHash('md5').update(JSON.stringify(history.disciplinas)).digest('hex')
  }

  return jwt.sign(payload, app.config.JWT_SECRET, {
    expiresIn: '1 month'
  })
}