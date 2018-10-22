function findQuadFromDate(month) {
  if([0, 1, 2, 10, 11].includes(month)) return 1
  if([3, 4, 5].includes(month)) return 2
  if([6, 7, 8, 9].includes(month)) return 3
}

module.exports = function findSeason(date) {
  return {
    1 : {
      quad: 1,
      year: new Date().getFullYear() + 1
    },
    2 : {
      quad: 2,
      year: new Date().getFullYear()
    },
    3 : {
      quad: 3,
      year: new Date().getFullYear()
    },
  }[findQuadFromDate(date || new Date().getMonth())]
}