const _ = require('lodash')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

var Model = module.exports = Schema({
  ca_aluno : Number,
  url : String,
  professor: String,
  pie: {
    A: Number,
    B: Number,
    C: Number,
    D: Number,
    F: Number
  },
  cr_professor: Number,
  reprovacoes: String,
  id: Number,
  cr_aluno: Number,
  trancamentos: String,
})

Model.index({ id: Number })