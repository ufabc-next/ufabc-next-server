const app = require('@/app')

module.exports = async(router) => {
  router.get('/analysis/:teacherId',
    app.helpers.routes.func(require('./func.js')))
}