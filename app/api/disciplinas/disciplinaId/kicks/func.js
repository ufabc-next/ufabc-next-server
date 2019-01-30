const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')

module.exports = async function (context) {
  let { disciplinaId } = context.params
  let { sort } = context.query

  if(!disciplinaId) {
    throw new errors.BadRequest.MissingParameter('disciplinaId')
  }

  const season = app.helpers.season.findSeasonKey()
  const Disciplinas = app.models.disciplinas.bySeason(season)
  const Alunos = app.models.alunos.bySeason(season)
  const findId = app.helpers.courses.findId

  // find disciplina
  let disciplina = await Disciplinas.findOne({ disciplina_id: disciplinaId })

  if(!disciplina) {
    throw new errors.NotFound('disciplina')
  }

  // create sort mechanism
  const kicks = sort ? sort : kickRule(disciplina)
  const order = Array(kicks.length || 0).fill('desc')
  
  // turno must have a special treatment
  const turnoIndex = kicks.indexOf('turno')
  if(turnoIndex != -1) {
    order[turnoIndex] = (disciplina.turno == 'diurno') ? 'asc' : 'desc'
  }

  const isAfterKick = _(disciplina.after_kick).castArray().compact().value().length
  const result = resolveMatriculas(disciplina, isAfterKick)

  const resultMap = new Map([...result.map(r => [r.aluno_id, r])])
  let students = await Alunos.aggregate([
    { $match: { aluno_id: { $in: _.map(result, 'aluno_id' ) } } },
    { $unwind: "$cursos" }
  ])

  const interIds = [
    await findId('Bacharelado em Ciência e Tecnologia', season),
    await findId('Bacharelado em Ciência e Humanidades', season),
  ]

  const obrigatorias = _.pull(disciplina.obrigatorias, ...interIds)

  students = students.map(s => {
    const reserva = _.includes(obrigatorias, s.cursos.id_curso)

    return _.extend({
      aluno_id: s.aluno_id,
      cr : s.cursos.cr,
      cp: s.cursos.cp,
      ik: reserva ? s.cursos.ind_afinidade : 0,
      reserva: reserva,
      turno: s.cursos.turno,
      curso: s.cursos.nome_curso,
    }, resultMap.get(s.aluno_id) || {})
  })

  return _(students)
    .orderBy(kicks, order)
    .value()
}

function kickRule(disciplina) {
  const coeffRule = disciplina.ideal_quad ? ['cr', 'cp'] : ['cp', 'cr']
  return ['reserva', 'turno', 'ik'].concat(coeffRule)
}

function resolveMatriculas(disciplina, isAfterKick) {
  // if kick has not arrived, not one has been kicked
  if(!isAfterKick) {
    return (disciplina.alunos_matriculados || []).map(d => ({
      aluno_id: d
    }))
  }

  // check diff between before_kick and after_kick
  let kicked = _.difference(disciplina.before_kick || [], disciplina.after_kick || [])

  // return who has been kicked
  return disciplina.before_kick.map(d => ({
    aluno_id: d,
    kicked: kicked.includes(d)
  }))
}