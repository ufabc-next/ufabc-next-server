const _ = require('lodash')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

var Model = module.exports = Schema({
  name : String,
})

Model.pre('save', async function () {
  this.name = _.startCase(_.camelCase(this.name))
})