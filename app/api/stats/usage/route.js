const app = require('@/app')

module.exports = async(router) => {
  router.get('/stats/usage',
    app.helpers.routes.func(require('./func.js')))
}