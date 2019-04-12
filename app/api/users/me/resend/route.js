const app = require('@/app')

module.exports = async(router) => {
  router.post('/users/me/resend',
    app.helpers.routes.func(require('./func.js')))
}