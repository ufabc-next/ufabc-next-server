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
    picture: String
  },
  ra: {
    type: Number,
    unique: true,
    partialFilterExpression: { ra: { $exists: true }}
  },
  email: {
    type: String,
    validate: {
      validator: v => v.indexOf('ufabc.edu.br') != -1,
      message: props => `${props.value} não é um e-mail válido`
    },
    unique: true,
    partialFilterExpression: { email: { $exists: true }}
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true
  },
  permissions: [String]
})

Model.virtual('isFilled').get(function () {
  return this.ra && this.email
})

Model.method('generateJWT', function () {
  return jwt.sign(_.pick(this, [
    '_id',
    'ra',
    'confirmed',
    'email',
    ]), app.config.JWT_SECRET)
})

Model.method('sendConfirmation', async function () {
  // !app.config.isTest && app.agenda.now('sendConfirmation', this.toObject({ virtuals: true }))
  app.agenda.now('sendConfirmation', this.toObject({ virtuals: true }))
})

Model.pre('save', async function () {
  if(this.isFilled && !this.confirmed) {
    this.sendConfirmation()
  }
})