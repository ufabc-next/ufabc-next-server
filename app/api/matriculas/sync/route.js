const app = require('@/app')

module.exports = async(router) => {
  router.get('/matriculas/sync',
    app.helpers.routes.rule(require('./rule.js')),
    app.helpers.routes.func(require('./func.js')))
}