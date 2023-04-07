const Schema = require('mongoose').Schema

const Model = module.exports = Schema({
  /** One of: mandatory, limited, free */
  category: String,
  /** How much confidence we have this is the right category */
  confidence: String,
  /** One of: firstLevelMandatory, secondLevelMandatory, thirdLevelMandatory */
  subcategory: String,
  
  creditos: Number,
  codigo: String,

  year: Number,
  quad: Number,

  /** Array of codes for equivalents */
  equivalents: [{
    type: String
  }],

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