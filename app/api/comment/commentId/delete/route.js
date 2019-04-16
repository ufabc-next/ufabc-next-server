const app = require('@/app')

module.exports = async(router) => {
  router.delete('/comment/:commentId',
    app.helpers.routes.func(require('./func.js')))
}