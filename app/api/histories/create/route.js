const app = require('@/app')

module.exports = async(router) => {
  router.post('/histories',
    app.helpers.routes.func(require('./func.js')))
}