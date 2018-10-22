const app = require('@/app')

module.exports = async(router) => {
  router.get('/subjects/search',
    app.helpers.routes.func(require('./func.js')))
}