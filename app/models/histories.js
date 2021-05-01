const _ = require('lodash')
const app = require('@/app')
const Schema = require('mongoose').Schema

const Model = module.exports = Schema({
  ra : Number,
  disciplinas: Object,
  coefficients: Object,

  curso: String,
  grade: String
})

// Model.index({ curso: 1, grade: 1 })

Model.method('updateEnrollments', async function () {
  app.agenda.now('updateUserEnrollments', this.toObject({ virtuals: true }))
})

Model.pre('findOneAndUpdate', async function () {
  const update = _.pick(this._update, [
    'ra',
    'disciplinas',
    'curso',
    'grade',
    'mandatory_credits_number',
    'limited_credits_number',
    'free_credits_number',
    'credits_total'
  ])
  
  app.agenda.now('updateUserEnrollments', update)
})

Model.post('save', async function () {
  app.agenda.now('updateUserEnrollments', this.toObject({ virtuals: true }))
})

