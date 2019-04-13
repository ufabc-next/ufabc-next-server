const app = require('@/app')

module.exports = async(router) => {
  router.post('/analysis',
    app.helpers.routes.func(require('./func.js')))
}