const app = require('@/app')

module.exports = async(router) => {
  router.delete('/intendedGraduation/:graduationId',
    app.helpers.routes.func(require('./func.js')))
}