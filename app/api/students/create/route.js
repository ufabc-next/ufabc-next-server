const app = require('@/app')

module.exports = async(router) => {
  router.post('/students',
    app.helpers.routes.func(require('./func.js')))
}