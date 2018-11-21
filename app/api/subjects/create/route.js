const app = require('@/app')

module.exports = async(router) => {
  router.post('/private/subjects',
    app.helpers.routes.func(require('./func.js')))
}