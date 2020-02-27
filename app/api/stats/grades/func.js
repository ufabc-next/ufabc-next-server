const app = require('@/app')

function createGroup(totalPoints, inc){
  const branches = [...Array(totalPoints).keys()].map(k => ({
    case: { $lt: ['$value.cr_acumulado', inc * k ]}, then: inc * k
  }))

  return {
    $switch: {
      branches,
      default: inc * totalPoints
    }
  }
}

module.exports = async function getGradeStats() {
  const points = 40
  const interval = 4 / points

  const distribution = await app.models.histories.aggregate([{
    $match: { 'coefficients.2018.3': { $exists: true }}
  }, {
    $project: {
      value: '$coefficients.2018.3'
    }
  },
  {
    $group: {
      _id: createGroup(points, interval),
      total: { $sum: 1 },
      point: { $avg: '$value.cr_acumulado' }
    }
  },
  { $sort: { point : 1 } }
  ])


  let normalizedDistribution = distribution.map((interval) => {
    interval._id = interval._id.toFixed(2)
    interval.point = interval.point .toFixed(2)
    return interval
  })

  console.log('DIST', normalizedDistribution)

  return normalizedDistribution
}