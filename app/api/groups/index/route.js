const app = require('@/app')

module.exports = async(router) => {
  router.get('/private/groups/index',
    app.helpers.routes.func(require('./func.js')))
}