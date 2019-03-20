const _ = require('lodash')
const app = require('@/app')
const mongoose = require('mongoose')

module.exports = async function (context) {
  let { teacherId } = context.params

  if(!teacherId) {
    return
  }

  const cacheKey = `reviews_${teacherId}`

  let cached =  await app.redis.cache.get(cacheKey)
  
  if(cached){
    return cached
  }

  teacherId = mongoose.Types.ObjectId(teacherId)

  let stats = await app.models.enrollments.aggregate([
    { 
      $match: { 
        mainTeacher: teacherId,
        cr_acumulado: { $exists: true }, 
        conceito: { $exists: true }
      } 
    },
    {
      $group: { 
        _id: { subject: '$subject', conceito: '$conceito' },
        cr_medio: { $avg: "$cr_acumulado" },
        count: { "$sum": 1 }
      }
    }, 
    {
      $group: {
        _id: "$_id.subject",
        distribution: {
          $push: {
            conceito: "$_id.conceito",
            count: "$count",
            cr_medio: "$cr_medio",
          }
        },
        cr_medio: { $avg: "$cr_medio" },
        count: { $sum: "$count" }
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

  const resp =  {
    teacher: await app.models.teachers.findOne({ _id: teacherId }).lean(true),
    general: _.merge(getMean(generalDistribution), { distribution: generalDistribution }),
    specific: await app.models.subjects.populate(stats, '_id')
  }

  await app.redis.cache.set(cacheKey, resp, '1d')
  return resp
}