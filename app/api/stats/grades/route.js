const app = require('@/app')

module.exports = async(router) => {
  router.get('/stats/grades',
    app.helpers.routes.func(require('./func.js')))
}