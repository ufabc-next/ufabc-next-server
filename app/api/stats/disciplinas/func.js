const _ = require('lodash')
const app = require('@/app')

module.exports = async function getDisciplinaStats(context) {
  let { season, turno, curso_id, ratio, limit, page } = _.defaults(context.query, {
    limit: 10,
    page: 0,
  })
  let { action } = context.params
  if(!season) season = app.helpers.season.findSeasonKey()

  const Disciplinas = app.models.disciplinas.bySeason(season)
  const findId = app.helpers.courses.findId

  // check if query has been made
  let match = { }
  if(turno) match.turno = turno
  if(curso_id) {
    curso_id = parseInt(curso_id)
    // get ids of inter courses
    const interIds = [
      await findId('Bacharelado em Ciência e Tecnologia', season),
      await findId('Bacharelado em Ciências e Humanidades', season),
    ]

    match.obrigatorias = { $in: [curso_id] }

    // if passed course is not a BI, take BIs off query
    if(!interIds.includes(curso_id)) {
      match.obrigatorias['$nin'] = interIds
    }
  }

  // parse page to integer
  page = parseInt(page)

  // check if we are dealing with previous data or current
  const isPrevious = await Disciplinas.count({ before_kick: { $exists: true, $ne: [] }})
  const dataKey = isPrevious ? '$before_kick' : '$alunos_matriculados'

  const resp = await Disciplinas.aggregate([
    { $match:  match },
    { $project:
      {
        vagas: 1,
        turno: 1,
        codigo: 1,
        disciplina: 1,
        obrigatorias: 1,
        turma: 1,
        requisicoes: { $size: { $ifNull: [ dataKey, [] ] } },
      }
    },
    { $match: { vagas: { $gt: 0 }} },
    { $project:
      {
        vagas:1,
        turno: 1,
        codigo: 1,
        disciplina: 1,
        obrigatorias: 1,
        requisicoes: 1,
        turma: 1,
        deficit: { $subtract: [ '$requisicoes', '$vagas' ] },
        ratio: { $divide: [ '$requisicoes', '$vagas' ] } 
      }
    },
    ...isRatio(ratio),
    ...resolveStep(action, turno, curso_id),
    { $facet: 
      {
        total: [ { $count: 'total' }],
        data: [
          { $sort : { [ratio != null ? 'ratio' : 'deficit'] : -1 } },
          { $skip: page * limit },
          { $limit: limit },
          { $project:
            {
              codigo: 1,
              disciplina: 1,
              turma: 1,
              turno: 1,
              vagas:1,
              requisicoes: 1,
              deficit: 1,
              ratio: 1,
            }
          }
        ]
      }
    },
    { $addFields:
      {
        total: { $ifNull: [{ $arrayElemAt: [ '$total.total', 0 ] }, 0] },
        page: page
      }
    },
    {
      $project: {
        total: 1,
        data: 1,
        page: 1
      }
    }
  ])

  return resp[0]
}

function isRatio(ratio){
  return ratio != null ? [{ $match: { ratio: { $gt: parseFloat(ratio) }} }] : []
}

function getOverviewSteps() {
  return [
    { $group : 
      {
        _id: null,
        vagas: { $sum : '$vagas' },
        requisicoes: { $sum : '$requisicoes' },
        deficit: { $sum : '$deficit' },
      }
    }
  ]
}

function getDisciplineSteps() {
  return [
    { $group :
      {
        _id: '$codigo',
        disciplina: { $first: '$disciplina' },
        vagas: { $sum : '$vagas' },
        requisicoes: { $sum : '$requisicoes' } 
      }
    },
    { $project:
      {
        disciplina: 1,
        vagas: 1,
        requisicoes:1,
        codigo: 1,
        deficit: { $subtract: [ '$requisicoes', '$vagas' ] },
        ratio: { $divide: [ '$requisicoes', '$vagas' ] },
      }
    }
  ]
}

function getCourseSteps(turno, curso_id) {
  let match = {}
  if(turno) match.turno = turno
  if(curso_id) match.obrigatorias = parseInt(curso_id)

  return [
    { $unwind: '$obrigatorias' },
    { $match: match },
    { $group : 
      {
        _id : '$obrigatorias',
        obrigatorias: { $first: '$obrigatorias' },
        disciplina: { $first: '$disciplina' },
        vagas : { $sum : '$vagas' },
        requisicoes: { $sum : '$requisicoes' }
      }
    },
    { $project:
      {
        vagas: 1,
        requisicoes: 1,
        deficit: { $subtract: [ '$requisicoes', '$vagas' ] },
        ratio: { $divide: [ '$requisicoes', '$vagas' ] },
      }
    }
  ]
}

function resolveStep(action, ...args) {
  const fn = {
    'overview': getOverviewSteps,
    'disciplines': getDisciplineSteps,
    'courses': getCourseSteps,
  }[action] || function () { return [] }

  return fn(...args)
}