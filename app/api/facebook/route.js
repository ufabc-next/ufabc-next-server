const app = require('@/app')

module.exports = async (router) => {
  router.post('/facebook/sync', app.helpers.routes.func(require('./func.js')))
}
