const _ = require('lodash')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

var Model = module.exports = Schema({
  name : String,
  search: String,
})

Model.pre('save', function () {
  this.search = _.startCase(_.camelCase(this.name))
})