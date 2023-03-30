const app = require('@/app')

module.exports = async(router) => {
  router.delete('/gradeSimulation/:gradeSimulationId',
    app.helpers.routes.func(require('./func.js')))
}