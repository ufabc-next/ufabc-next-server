const app = require('@/app')
const errors = require('@/errors')
const _ = require('lodash')

module.exports = async (context) => {
  const { aluno_id, ra, login } = context.body

  if (!aluno_id) {
    throw new errors.BadRequest.MissingParameter('aluno_id')
  }

  const season = app.helpers.season.findSeasonKey()
  const Alunos = app.models.alunos.bySeason(season)
  const Disciplinas = app.models.disciplinas.bySeason(season)

  // check if already passed, if so does no update this user anymore
  const isPrevious = await Disciplinas.count({
    before_kick: { $exists: true, $ne: [] },
  })
  if (isPrevious) {
    return await Alunos.findOne({ aluno_id: aluno_id })
  }

  if (
    (context.body.cursos || []).some(
      (curso) => !curso.curso_id || curso.curso_id == 'null'
    ) ||
    !ra
  ) {
    return await Alunos.findOne({
      aluno_id: aluno_id,
    })
  }

  const cursos = (context.body.cursos || []).map(async (c) => {
    let courseCleaned = c.curso.trim().replace('↵', '').replace(/\s+/g, ' ')
    let cpLastQuad = null
    if (
      season == "2020:2" ||
      season == "2020:3" ||
      season == "2021:1" ||
      season == "2021:2" ||
      season == "2021:3" ||
      season == "2022:1"
    ) {
      const history = await app.models.historiesGraduations.findOne({
        ra: ra,
        curso: courseCleaned,
      })
      cpLastQuad = _.get(history, 'coefficients.2019.3.cp_acumulado', c.cp)
    }

    c.cr = _.isFinite(c.cr) ? app.helpers.parse.toNumber(c.cr) : 0
    c.cp = _.isFinite(c.cp) ? app.helpers.parse.toNumber(cpLastQuad) : 0
    c.quads = _.isFinite(c.quads) ? app.helpers.parse.toNumber(c.quads) : 0
    c.nome_curso = courseCleaned
    c.ind_afinidade = 0.07 * c.cr + 0.63 * c.cp + 0.005 * c.quads
    c.id_curso = c.curso_id
    return c
  })

  return await Alunos.findOneAndUpdate(
    {
      aluno_id: aluno_id,
    },
    {
      cursos: await Promise.all(cursos),
      ra: ra,
      login: login,
    },
    {
      new: true,
      upsert: true,
    }
  )
}
