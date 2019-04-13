const app = require('@/app')

module.exports = async(router) => {
  router.get('/private/disciplinas/clear',
    app.helpers.routes.func(require('./func.js')))
}