const _ = require('lodash')
const app = require('@/app')
const Scores = require('./scores')

module.exports = async function getScores(teacher) {
  teacher = _.castArray(teacher)
  const scores = await Scores()

  return scores.filter(score => {
    return teacher.map(Number).includes(parseInt(score.id))
  })
}