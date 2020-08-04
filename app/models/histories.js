const app = require('@/app')
const Schema = require('mongoose').Schema

const Model = module.exports = Schema({
  ra : Number,
  disciplinas: Object,
  coefficients: Object,

  curso: String,
  grade: String
})

Model.method('updateEnrollments', async function () {
  app.agenda.now('updateUserEnrollments', this.toObject({ virtuals: true }))
})

Model.pre('findOneAndUpdate', async function () {
  app.agenda.now('updateUserEnrollments', this._update)
})

Model.post('save', async function () {
  app.agenda.now('updateUserEnrollments', this.toObject({ virtuals: true }))
})

