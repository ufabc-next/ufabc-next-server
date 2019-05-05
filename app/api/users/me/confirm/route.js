const app = require('@/app')

module.exports = async(router) => {
  router.post('/users/me/confirm',
    app.helpers.routes.func(require('./func.js')))

  router.post('/account/confirm',
    app.helpers.routes.func(require('./func.js')))
}