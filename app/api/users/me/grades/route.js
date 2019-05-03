const app = require('@/app')

module.exports = async(router) => {
  router.get('/users/me/grades',
    app.helpers.routes.func(require('./func.js')))
}