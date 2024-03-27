const app = require('@/app')

module.exports = async (router) => {
  router.get(
    '/graduations/stats/:id',
    app.helpers.routes.func(require('./func.js'))
  )
}
