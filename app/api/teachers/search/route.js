const app = require('@/app')

module.exports = async(router) => {
  router.get('/teachers/search',
    app.helpers.routes.func(require('./func.js')))
}