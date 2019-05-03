const _ = require('lodash')
const app = require('@/app')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const Model = module.exports = Schema({
  year: {
    type: Number,
    required: true,
  },
  quad: {
    type: Number,
    required: true
  },
  identifier: String,
  ra: Number,
  disciplina: String,
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'subjects'
  },
  campus: String,
  turno: String,
  turma: String,
  teoria: {
    type: Schema.Types.ObjectId,
    ref: 'teachers'
  },
  pratica: {
    type: Schema.Types.ObjectId,
    ref: 'teachers'
  },
  mainTeacher: {
    type: Schema.Types.ObjectId,
    ref: 'teachers'
  },
  comments: [{
    type: String,
    enum: ['teoria', 'pratica'],
  }],
  // vem do portal
  conceito: String,
  creditos: Number,
  ca_acumulado: Number,
  cr_acumulado: Number,
})

Model.index({ identifier: 1, ra: 1 })
Model.index({ ra: 1 })
Model.index({ mainTeacher: 1, subject: 1, cr_acumulado: 1, conceito: 1 })

function pre(doc) {
  if('teoria' in doc || 'pratica' in doc ) {
    doc.mainTeacher = _.get(doc, 'teoria._id', doc.teoria) || _.get(doc, 'pratica._id', doc.pratica)
  }
}

Model.pre('save', function () {
  pre(this)
})

Model.pre('findOneAndUpdate', function () {
  pre(this._update)
})