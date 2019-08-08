const _ = require('lodash')
const app = require('@/app')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const Model = module.exports = Schema({
  disciplina: {
    type: String
  },

  season: {
    type: String
  },

  mainTeacher: {
    type: Schema.Types.ObjectId,
    ref: 'teachers',
    required: true
  },

  users: [{
    type: Number,
    required: true
  }]
})

Model.index({ users: -1 })