const _ = require('lodash')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

var Model = module.exports = Schema({
  season: [{
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'subject',
      required: true
    },
    creditos: {
      type: Number,
      min: 1,
      validate: Number.isInteger,
      required: true
    },
    conceito: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'E', 'F', 'O'],
      required: true
    },
  }],
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
})
