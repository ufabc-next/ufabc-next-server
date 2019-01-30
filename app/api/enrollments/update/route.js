const app = require('@/app')

module.exports = async(router) => {
  router.put('/enrollments/:identifier',
    app.helpers.routes.func(require('./func.js')))
}