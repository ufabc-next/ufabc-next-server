const app = require('@/app')

module.exports = async(router) => {
  router.get('/private/histories/courses',
    app.helpers.routes.func(require('./func.js')))
}