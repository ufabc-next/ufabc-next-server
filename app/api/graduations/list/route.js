const app = require('@/app')

module.exports = async (router) => {
  router.get('/graduations', app.helpers.routes.func(require('./func.js')))
}
