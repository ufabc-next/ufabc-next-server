const app = require('@/app')

module.exports = async(router) => {
  router.get('/reviews/teachers/:teacherId',
    app.helpers.routes.func(require('./func.js')))
}