const app = require('@/app')

module.exports = async(router) => {
  router.get('/comment/:teacherId',
    app.helpers.routes.func(require('./func.js')))
}