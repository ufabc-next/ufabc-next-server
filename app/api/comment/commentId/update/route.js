const app = require('@/app')

module.exports = async(router) => {
  router.put('/comments/:commentId',
    app.helpers.routes.func(require('./func.js')))
}