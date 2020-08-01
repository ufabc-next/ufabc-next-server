const _ = require('lodash')
const app = require('@/app')
const Schema = require('mongoose').Schema

const Model = module.exports = Schema({
  ra: Number,
  coefficients: Object,
  
  curso: String,
  grade: String
})