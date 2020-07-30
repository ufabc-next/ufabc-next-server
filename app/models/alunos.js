const app = require('@/app')
const Schema = require('mongoose').Schema

const CursoSchema = Schema({
  id_curso : Number,
  nome_curso : String,
  cp: Number,
  cr: Number,
  ind_afinidade : Number,
  turno : String
})

const Model = module.exports = Schema({
  ra: Number,
  login: String,
  aluno_id: Number,
  cursos: [CursoSchema],

  year: Number,
  quad: Number,

  quads: Number,
})

function setSeason(doc) {
  const season = app.helpers.season.findSeason()
  doc.year = season.year
  doc.quad = season.quad
}

Model.pre('save', function () {
  if(!this.season) {
    setSeason(this)
  }
})

Model.pre('findOneAndUpdate', function () {
  if(!this._update.season) {
    setSeason(this._update)
  }
})