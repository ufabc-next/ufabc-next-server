const app = require('@/app')

module.exports = async(router) => {
  router.put('/comment/:commentId',
    app.helpers.routes.func(require('./func.js')))
}