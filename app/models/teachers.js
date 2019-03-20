const _ = require('lodash')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

var Model = module.exports = Schema({
  name: {
    type: String,
    required: true,
  },
})

Model.pre('save', async function () {
  this.name = _.startCase(_.camelCase(this.name))
})