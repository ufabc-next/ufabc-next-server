const app = require('@/app')

module.exports = async(router) => {
  router.get('/enrollments/',
    app.helpers.routes.func(require('./func.js')))
}