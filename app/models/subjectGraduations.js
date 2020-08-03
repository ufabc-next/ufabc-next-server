const Schema = require('mongoose').Schema

const Model = module.exports = Schema({
  creditos: Number,
  codigo: String,
  
  year: Number,
  quad: Number,

  subject: {
    type: Schema.Types.ObjectId,
    ref: 'subjects'
  },

  graduation: {
    type: Schema.Types.ObjectId,
    ref: 'graduation'
  }
})

Model.index({ graduation: 1 })