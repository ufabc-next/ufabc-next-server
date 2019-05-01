const app = require('@/app')

module.exports = async(router) => {
  router.get('/comments/:userId/missing',
    app.helpers.routes.func(require('./func.js')))
}