const app = require('@/app')

module.exports = async(router) => {
  router.get('/reviews/subjects/:subjectId',
    app.helpers.routes.func(require('./func.js')))
}