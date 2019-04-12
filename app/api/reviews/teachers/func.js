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
        conceito: { $in: ['A', 'B', 'C', 'D', 'O', 'F'] } 
      } 
    },
    {
      $group: { 
        _id: {
          conceito: '$conceito',
          subject: '$subject'
        },
        cr_medio: { $avg: "$cr_acumulado" },
        count: { "$sum": 1 },
        crs: { $push: "$cr_acumulado" },
        weight: {
          $first : {
            $switch: {
             branches: [
                { case: { $eq: ["$conceito", "A"]}, then: 4 },
                { case: { $eq: ["$conceito", "B"]}, then: 3 },
                { case: { $eq: ["$conceito", "C"]}, then: 2 },
                { case: { $eq: ["$conceito", "D"]}, then: 1 },
                { case: { $eq: ["$conceito", "O"]}, then: 0 },
                { case: { $eq: ["$conceito", "F"]}, then: 0 }
             ],
             default: null
            }
          }
        },
      }
    }, {
      $addFields: {
        crs: {
          $filter: {
            input: "$crs",
            as: "d",
            cond: { $ne: [ "$$d", null ] }
          }
        }
      }
    }, {
      $project: {
        _id: 1,
        cr_medio: 1,
        count: 1,
        weight: 1,
        crs: 1,
        amount: { $size: "$crs" },
      }
    },
    {
      $group: {
        _id: "$_id.subject",
        distribution: {
          $push: {
            conceito: "$_id.conceito",
            weight: "$weight",
            count: "$count",
            cr_medio: "$cr_medio",
            numeric: { $multiply: ["$amount", "$cr_medio"] },
            numericWeight: { $multiply: ["$amount", "$weight"] },
            amount: "$amount",
          }
        },
        numericWeight: { $sum : { $multiply: ["$amount", "$weight"] } },
        numeric: { $sum : { $multiply: ["$amount", "$cr_medio"] } },
        amount: { $sum: "$amount" },
        count: { $sum: "$count" }
      }
    }, {
      $project: {
        distribution: 1,
        numericWeight: 1,
        numeric: 1,
        amount: 1,
        count: 1,
        cr_professor: { $divide : ["$numericWeight", "$amount"]},
      }
    }
  ])

  // calculate cr_medio
  stats = stats.map(s => {
    s.cr_medio = s.numeric / s.amount
    return s
  })

  function getMean(value, key) {
    const count = _.sumBy(value, 'count')
    const amount = _.sumBy(value, 'amount')
    const simpleSum = value.filter(v => v.cr_medio != null).map(v => v.amount * v.cr_medio)

    return {
      conceito: key,
      cr_medio: _.sum(simpleSum) / amount,
      cr_professor: _.sumBy(value, 'numericWeight') / amount,
      count: count,
      amount:  amount,
      numeric: _.sumBy(value, 'numeric'),
      numericWeight:  _.sumBy(value, 'numericWeight'),
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