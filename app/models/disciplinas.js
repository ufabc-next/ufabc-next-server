const app = require('@/app')
const Schema = require('mongoose').Schema

var Model = module.exports = Schema({
  disciplina_id: Number,
  disciplina: String,
  turno: String,
  turma: String,
  vagas: Number,
  obrigatorias: [Number],
  codigo: String,
  campus: String,
  ideal_quad: Boolean,

  subject: {
    type: Schema.Types.ObjectId,
    ref: 'subjects'
  },

  identifier: {
    type: String,
    required: true
  },

  // lista de alunos matriculados no momento
  alunos_matriculados: {
    type: [Number],
    default: []
  },

  // como estava o estado da matrícula antes do chute
  before_kick: {
    type: [Number],
    default: []
  },

  // como estava o estado da matrícula após o chute
  after_kick: {
    type: [Number],
    default: []
  },
  
  year: Number,
  quad: Number,

  teoria: {
    type: Schema.Types.ObjectId,
    ref: 'teachers'
  },
  pratica: {
    type: Schema.Types.ObjectId,
    ref: 'teachers'
  },
})

Model.virtual('requisicoes').get(function () {
  return (this.alunos_matriculados || []).length
})

Model.index({ identifier: 1 })

Model.pre('findOneAndUpdate', function () {
  if(!this._update.season) {
    const season = app.helpers.season.findSeason()
    this._update.year = season.year
    this._update.quad = season.quad
  }
})