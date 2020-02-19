const app = require('@/app')

module.exports = async (router) => {
  router.post('/users/me/devices',
    app.helpers.routes.func(require('./func.js')))
}