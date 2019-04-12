const app = require('@/app')

module.exports = async(router) => {
  router.get('/private/enrolmments/sync',
    app.helpers.routes.func(require('./func.js')))
}