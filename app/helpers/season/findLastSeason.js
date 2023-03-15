const findSeason = require('./findSeason')

module.exports = function findLastSeason(date) {
  const d = findSeason(date)

  if(d.quad === 1) {
    return { year: (d.year - 1),  quad: 3 }
  }
  return { year: d.year, quad: d.quad - 1 }
}