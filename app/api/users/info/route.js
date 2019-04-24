const app = require('@/app')

module.exports = async (router) => {
  router.get('/users/info',
    app.helpers.routes.func(require('./func.js')))
}