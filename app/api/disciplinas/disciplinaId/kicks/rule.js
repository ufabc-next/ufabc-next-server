const app = require('@/app')
const errors = require('@/errors')

module.exports = async function (context) {
  const { aluno_id } = context.query

  const season = app.helpers.season.findSeasonKey()
  const Alunos = app.models.alunos.bySeason(season)
  
  const aluno = await Alunos.findOne({ aluno_id }).lean(true)

  if(aluno) {
    return
  }

  throw new errors.Forbidden('aluno_id')
}