const app = require('@/app')

module.exports = async(router) => {
  router.get('/help/subjects/:subjectId',
    app.helpers.routes.func(require('./func.js')))
}