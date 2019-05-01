const app = require('@/app')

module.exports = async(router) => {
  router.delete('/comments/:commentId',
    app.helpers.routes.func(require('./func.js')))
}