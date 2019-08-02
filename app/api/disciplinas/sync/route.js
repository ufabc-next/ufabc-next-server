const app = require('@/app')

module.exports = async(router) => {
  router.post('/private/disciplinas/sync',
    app.helpers.routes.func(require('./func.js')))
}