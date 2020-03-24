const app = require('@/app')

module.exports = async(router) => {
  router.post('/users/me/recover',
    app.helpers.routes.func(require('./func.js')))
}