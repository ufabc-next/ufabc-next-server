const _ = require('lodash')
const Schema = require('mongoose').Schema

var Model = module.exports = Schema({
  name: {
    type: String,
    required: true,
  },
  alias: [String]
})

Model.pre('save', async function () {
  this.name = _.startCase(_.camelCase(this.name))
})