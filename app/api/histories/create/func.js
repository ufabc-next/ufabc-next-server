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
}