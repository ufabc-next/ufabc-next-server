const app = require('@/app')

module.exports = async(router) => {
  router.get('/graduations/me',
    app.helpers.routes.func(require('./func.js')))
}