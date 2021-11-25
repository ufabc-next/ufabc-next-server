const app = require('@/app')

module.exports = async(router) => {
  router.put('/gradeSimulation/:gradeSimulationId',
    app.helpers.routes.func(require('./func.js')))
}