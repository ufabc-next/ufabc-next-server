const app = require('@/app')

module.exports = async(router) => {
  router.post('/enrollments',
    app.helpers.routes.rule(require('./rule.js')),
    app.helpers.routes.func(require('./func.js')))
}