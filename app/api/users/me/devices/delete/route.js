const app = require('@/app')

module.exports = async (router) => {
  router.delete('/users/me/devices/:deviceId',
    app.helpers.routes.func(require('./func.js')))
}