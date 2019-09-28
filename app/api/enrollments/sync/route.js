const app = require('@/app')

module.exports = async(router) => {
  router.post('/private/enrollments/sync/pdf',
    app.helpers.routes.func(require('./func.js')))
}