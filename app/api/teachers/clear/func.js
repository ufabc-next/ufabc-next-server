const cachegoose = require('cachegoose')

module.exports = function () {
  cachegoose.clearCache('teachers')
}