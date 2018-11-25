const app = require('@/app')

module.exports = async(router) => {
  router.get('/stats/disciplinas/:action',
    app.helpers.routes.func(require('./func.js')))

  router.get('/stats/disciplinas',
    app.helpers.routes.func(require('./func.js')))
}