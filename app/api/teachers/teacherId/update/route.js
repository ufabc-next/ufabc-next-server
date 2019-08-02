const app = require('@/app')

module.exports = async(router) => {
  router.put('/private/teachers/:teacherId',
    app.helpers.routes.func(require('./func.js')))
}