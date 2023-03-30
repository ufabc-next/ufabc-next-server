const app = require('@/app')
const Schema = require('mongoose').Schema

const Model = module.exports = Schema({
  subject: ref,
  historyGraduation: ref,
  grade: String,
  season: String,
  year: Number,
  quad: Number,
  active: {
    type: Boolean,
    default: true,
  },
})
