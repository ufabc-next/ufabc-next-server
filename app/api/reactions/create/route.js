const app = require('@/app')

module.exports = async(router) => {
  router.post('/reactions/:commentId',
    app.helpers.routes.func(require('./func.js')))
}