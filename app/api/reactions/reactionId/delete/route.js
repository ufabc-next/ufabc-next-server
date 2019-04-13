const app = require('@/app')

module.exports = async(router) => {
  router.delete('/reactions/:reactionId',
    app.helpers.routes.func(require('./func.js')))
}