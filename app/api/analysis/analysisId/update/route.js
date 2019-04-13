const app = require('@/app')

module.exports = async(router) => {
  router.put('/analysis/:analysisId',
    app.helpers.routes.func(require('./func.js')))
}