const app = require('@/app')

module.exports = async(router) => {
  router.post('/comments',
    app.helpers.routes.func(require('./func.js')))
}