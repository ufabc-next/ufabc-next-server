const app = require('@/app')

module.exports = async(router) => {
  router.post('/comment',
    app.helpers.routes.func(require('./func.js')))
}