const app = require('@/app')

module.exports = async(router) => {
  router.get('/comments/:teacherId',
    app.helpers.routes.func(require('./func.js')))

  router.get('/comments/:teacherId/:subjectId',
    app.helpers.routes.func(require('./func.js')))
}