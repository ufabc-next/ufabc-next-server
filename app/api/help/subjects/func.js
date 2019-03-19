const _ = require('lodash')
const app = require('@/app')
const mongoose = require('mongoose')

module.exports = async function (context) {
  let { subjectId } = context.params

  if(!subjectId) {
    return
  }

  subjectId = mongoose.Types.ObjectId(subjectId)

  let stats = await app.models.enrollments.aggregate([
    { 
      $match: { 
        subject: subjectId, 
        cr_acumulado: { $exists: true }, 
        conceito: { $exists: true } 
      } 
    },
    {
      $group: { 
        _id: {
          mainTeacher: '$mainTeacher',
          conceito: '$conceito',
          subject: '$subject'
        },
        cr_medio: { $avg: "$cr_acumulado" },
        count: { "$sum": 1 }
      }
    }, 
    { 
      $group: {
        _id: {
          mainTeacher: "$_id.mainTeacher",
        },
        distribution: {
          $push: {
            conceito: "$_id.conceito",
            count: "$count",
            cr_medio: "$cr_medio"
          }
        },
        cr_medio: { $avg: "$cr_medio" },
        count: { $sum: "$count" },
      }
    }, {
      $project: {
        distribution: 1,
        cr_medio: 1, 
        count: 1,
        teacher: "$_id.mainTeacher"
      }
    }
  ])

  function getMean(value, key) {
    const totalCount = _.sumBy(value, 'count')
    const simpleSum = value.map(v => v.count * v.cr_medio)
    return {
      conceito: key,
      cr_medio: _.sum(simpleSum) / totalCount,
      count: totalCount
    }
  }

  const generalDistribution = _(stats)
    .map('distribution')
    .flatten()
    .groupBy('conceito')
    .mapValues(getMean)
    .values()
    .value()

  return {
    subject: await app.models.subjects.findOne({ _id: subjectId }).lean(true),
    general: _.merge(getMean(generalDistribution), { distribution: generalDistribution }),
    specific: await app.models.teachers.populate(stats, 'teacher')
  }
}