const app = require('@/app')

module.exports = async(router) => {
  router.get('/subjects',
    app.helpers.routes.func(require('./func.js')))
}