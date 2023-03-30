const app = require('@/app')

module.exports = async(router) => {
  router.get('/gradeSimulation/:historyGraduationId',
    app.helpers.routes.func(require('./func.js')))
}