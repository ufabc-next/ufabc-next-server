const app = require('@/app')

module.exports = async(router) => {
  router.get('/simulation',
    app.helpers.routes.func(require('./func.js')))
}