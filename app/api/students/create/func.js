const app = require('@/app')
const errors = require('@/errors')
const _ = require('lodash')

module.exports = async(context) => {
  const { aluno_id, ra, login } = context.body

  if(!aluno_id) {
    throw new errors.BadRequest.MissingParameter('aluno_id')
  }

  const season = app.helpers.season.findSeasonKey()
  const Alunos = app.models.alunos.bySeason(season)
  const Disciplinas = app.models.disciplinas.bySeason(season)

  // check if already passed, if so does no update this user anymore
  const isPrevious = await Disciplinas.count({ before_kick: { $exists: true, $ne: [] }})
  if(isPrevious) {
    return await Alunos.findOne({ aluno_id: aluno_id })
  }

  let cpLastQuad
  if(season == '2020:3') {
    const history = await app.models.histories.findOne({ ra: ra }).lean(true)
    cpLastQuad = _.get(history, 'coefficients.2019.3.cp_acumulado', null)
    if(cpLastQuad) {
      cpLastQuad = app.helpers.parse.toNumber(cpLastQuad)
    }
  }

  const cursos = (context.body.cursos || []).map(async c => {
    c.cr = app.helpers.parse.toNumber(c.cr)
    c.cp = cpLastQuad ? cpLastQuad : app.helpers.parse.toNumber(c.cp),
    c.cp_real = app.helpers.parse.toNumber(c.cp)
    c.quads = app.helpers.parse.toNumber(c.quads)
    c.nome_curso = c.curso
    c.ind_afinidade = (0.07 * c.cr) + (0.63 * c.cp) + (0.005 * c.quads)
    c.id_curso = c.curso_id
    return c
  })

  return await Alunos.findOneAndUpdate({
    aluno_id: aluno_id
  }, {
    cursos: await Promise.all(cursos),
    ra: ra,
    login: login
  }, {
    new: true,
    upsert: true
  })
}