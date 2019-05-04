const app = require('@/app')

module.exports = async(router) => {
  router.delete('/users/me/delete',
    app.helpers.routes.func(require('./func.js')))
}