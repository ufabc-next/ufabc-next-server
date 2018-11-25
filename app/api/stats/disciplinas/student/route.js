const app = require('@/app')

module.exports = async(router) => {
  router.get('/stats/disciplinas/students',
    app.helpers.routes.func(require('./func.js')))
}