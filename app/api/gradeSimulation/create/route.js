const app = require('@/app')

module.exports = async(router) => {
  router.post('/gradeSimulation',
    app.helpers.routes.func(require('./func.js')))
}