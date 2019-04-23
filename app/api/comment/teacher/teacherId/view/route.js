const app = require('@/app')

module.exports = async(router) => {
  router.get('/comment/:teacherId',
    app.helpers.routes.func(require('./func.js')))

  router.get('/comment/:teacherId/:subjectId',
    app.helpers.routes.func(require('./func.js')))
}