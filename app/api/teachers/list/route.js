const app = require('@/app')

module.exports = async(router) => {
  router.get('/teachers',
    app.helpers.routes.func(require('./func.js')))
}