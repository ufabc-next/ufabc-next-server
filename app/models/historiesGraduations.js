const Schema = require('mongoose').Schema

module.exports = Schema({
  ra: Number,
  coefficients: Object,

  disciplinas: Object,
  
  curso: String,
  grade: String,
  graduation: {
    type: Schema.Types.ObjectId,
    ref: 'graduation',
  }
})