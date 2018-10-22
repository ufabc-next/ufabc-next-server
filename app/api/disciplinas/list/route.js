const app = require('@/app')

module.exports = async(router) => {
  router.get('/disciplinas',
    app.helpers.routes.func(require('./func.js')))
}