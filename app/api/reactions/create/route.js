const app = require('@/app')

module.exports = async(router) => {
  router.post('/reactions',
    app.helpers.routes.func(require('./func.js')))
}