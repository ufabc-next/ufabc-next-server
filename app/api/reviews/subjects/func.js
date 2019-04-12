const _ = require('lodash')
const app = require('@/app')
const mongoose = require('mongoose')

module.exports = async function (context) {
  let { subjectId } = context.params

  if(!subjectId) {
    return
  }

  const cacheKey = `reviews_${subjectId}`
  let cached =  await app.redis.cache.get(cacheKey)

  if(cached){
    return cached
  }

  subjectId = mongoose.Types.ObjectId(subjectId)

  let stats = await app.models.enrollments.aggregate([
    { 
      $match: {
        subject: subjectId,
        conceito: { $in: ['A', 'B', 'C', 'D', 'O', 'F'] } 
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
        total: { "$sum": 1 },
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
        total: 1,
        weight: 1,
        crs: 1,
        amount: { $size: "$crs" },
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
            weight: "$weight",
            total: "$total",
            cr_medio: "$cr_medio",
            numeric: { $multiply: ["$amount", "$cr_medio"] },
            numericWeight: { $multiply: ["$amount", "$weight"] },
            amount: "$amount",
          }
        }, 
        numericWeight: { $sum : { $multiply: ["$amount", "$weight"] } },
        numeric: { $sum : { $multiply: ["$amount", "$cr_medio"] } },
        amount: { $sum: "$amount" },
        total: { $sum: "$total" }
      }
    }, {
      $project: {
        distribution: 1,
        numericWeight: 1,
        numeric: 1,
        amount: 1,
        total: 1, 
        cr_professor: { $divide : ["$numericWeight", "$amount"]},
        teacher: "$_id.mainTeacher"
      }
    }
  ])

  // calculate cr_medio
  stats = stats.map(s => {
    s.cr_medio = s.numeric / s.amount
    return s
  })

  function getMean(value, key) {
    const total = _.sumBy(value, 'total')
    const amount = _.sumBy(value, 'amount')
    const simpleSum = value.filter(v => v.cr_medio != null).map(v => v.amount * v.cr_medio)

    return {
      conceito: key,
      cr_medio: _.sum(simpleSum) / amount,
      cr_professor: _.sumBy(value, 'numericWeight') / amount,
      total: total,
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

  const resp = {
    subject: await app.models.subjects.findOne({ _id: subjectId }).lean(true),
    general: _.merge(getMean(generalDistribution), { distribution: generalDistribution }),
    specific: await app.models.teachers.populate(stats, 'teacher')
  }

  await app.redis.cache.set(cacheKey, resp, '1d')
  return resp
}