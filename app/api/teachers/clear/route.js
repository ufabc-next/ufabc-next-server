const app = require('@/app')

module.exports = async(router) => {
  router.get('/private/teachers/clear',
    app.helpers.routes.func(require('./func.js')))
}