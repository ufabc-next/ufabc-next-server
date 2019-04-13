const app = require('@/app')

module.exports = async (router) => {
  router.put('/users/complete',
    // app.helpers.routes.rule(require('./rule.js')),
    app.helpers.routes.func(require('./func.js')))
}