const _ = require('lodash')
const Schema = require('mongoose').Schema

var Model = module.exports = Schema({
  name : {
    type: String,
    required: true
  },
  search: String,
  creditos: Number
})

Model.pre('save', function () {
  this.search = _.startCase(_.camelCase(this.name))
})