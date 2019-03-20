const _ = require('lodash')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema
const jwt = require('jsonwebtoken')
const app = require('@/app')

const Model = module.exports = Schema({
  oauth: {
    facebook: String,
    google: String,
    email: String,
  },
  ra: {
    type: Number,
    unique: true,
    partialFilterExpression: { ra: { $exists: true }}
  },
  email: {
    type: String,
  },
  confirmed: {
    type: Boolean, 
    default: false,
  },
  permissions: [String]
})

Model.virtual('filled').get(function () {
  return this.ra && this.email
})

Model.method('generateJWT', function () {
  return jwt.sign(_.pick(this, [
    'ra',
    'confirmed',
    'email',
    ]), app.config.JWT_SECRET)
})