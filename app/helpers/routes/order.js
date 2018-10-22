const _ = require('lodash')
const path = require('path')

module.exports = (router) => {
  let routes = _.map(router._router.stack)

  routes = _.sortBy(routes, [function (r) {
    let path = _.get(r, 'route.path', '')
    return partsWeight(pathParts(path)) * -1
  }])

  router._router.stack = routes

  // console.log(JSON.stringify(_.map(routes, 'route.path'), null, 2))

  // router._router.stack = routes
}

function pathParts(str) {
  return path.normalize('/' + str + '/').split('/')
}

function partsWeight(sliced) {
  return sliced.reduce(function(acc, part, i) {
    // If is bound part
    if (!/^:.+$/.test(part)) {
      // Weight is positively correlated to indexes of bound parts
      acc += Math.pow(i + 1, sliced.length)
    }
    return acc
  }, 0)
}
