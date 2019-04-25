const app = require('@/app')

module.exports = async(router) => {
  router.delete('/reactions/:commentId/:kind',
    app.helpers.routes.func(require('./func.js')))
}