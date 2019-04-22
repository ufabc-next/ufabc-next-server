const app = require('@/app')

module.exports = async(router) => {
  router.get('/comment/:userId/missing',
    app.helpers.routes.func(require('./func.js')))
}