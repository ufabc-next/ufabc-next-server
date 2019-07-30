const app = require('@/app')

module.exports = async(router) => {
  router.get('/private/relationships/:RA',
    app.helpers.routes.func(require('./func.js')))
}