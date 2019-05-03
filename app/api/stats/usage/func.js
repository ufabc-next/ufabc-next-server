const _ = require('lodash')
const ms = require('ms')
const app = require('@/app')

module.exports = async function getUsageStats(context) {
  let { season } = context.query
  if(!season) season = app.helpers.season.findSeasonKey()

  const Alunos = app.models.alunos.bySeason(season)
  const Disciplinas = app.models.disciplinas.bySeason(season)  
   const teachersCount = [
    { $group: { _id: null, teoria: { $addToSet: "$teoria"}, pratica: { $addToSet: "$pratica"} }},  
    { $project: { teachers: { $setUnion: [ "$teoria", "$pratica" ] } } },  
    { $unwind: { path: "$teachers", preserveNullAndEmptyArrays: true } },  
    { $group: { _id: null, total: { $sum:1 } } },  
    { $project: { _id: 0 } }  
  ]  

  const subjectsCount = [  
    { $group: { _id: null, total: { $sum: 1 } } },  
    { $project: { _id: 0 } }  
  ]  

  // check if we are dealing with previous data or current  
  const isPrevious = await Disciplinas.count({ before_kick: { $exists: true, $ne: [] }})  
  const dataKey = isPrevious ? "$before_kick" : "$alunos_matriculados"  
   const alunosCount = [  
    { $unwind: dataKey },  
    { $group: { _id: null, alunos: { $addToSet: dataKey} }},  
    { $unwind:"$alunos" },  
    { $group: { _id: null, total: { $sum:1 } }},  
  ]  

   const disciplinaStats = await Disciplinas.aggregate([{  
    $facet: {  
      teachers: teachersCount,  
      totalAlunos: alunosCount,  
      subjects: subjectsCount  
    },   
  }, {  
    $addFields: {  
      teachers: { $ifNull: [{ $arrayElemAt: [ "$teachers.total", 0 ] }, 0] },  
      totalAlunos: { $ifNull: [{ $arrayElemAt: [ "$totalAlunos.total", 0 ] }, 0] },  
      subjects: { $ifNull: [{ $arrayElemAt: [ "$subjects.total", 0 ] }, 0] },  
    }  
  }])

  const otherStats = {
    users: await app.models.users.count({}),
    currentAlunos: await Alunos.count({}),
    comments: await app.models.comments.count({}),
    enrollments: await app.models.enrollments.count({ conceito: { $in: ['A', 'B', 'C', 'D', 'O', 'F'] }})
  }

  return Object.assign({}, disciplinaStats[0], otherStats)
} 