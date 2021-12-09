const app = require('@/app')

module.exports = async(router) => {
  router.post('/intendedGraduation/:graduationId',
    app.helpers.routes.func(require('./func.js')))
}