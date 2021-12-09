const Schema = require('mongoose').Schema

const Model = module.exports = Schema({
  graduation: {
    type: Schema.Types.ObjectId,
    ref: 'graduation',
    required: true
  },
  
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },

  active: {
    type: Boolean,
    default: true
  }
})

Model.index({ graduation: 1, user: 1 })
