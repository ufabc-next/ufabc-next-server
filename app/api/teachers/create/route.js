const app = require('@/app')

module.exports = async(router) => {
  router.post('/private/teachers',
    app.helpers.routes.func(require('./func.js')))
}