const app = require('@/app')

module.exports = async(router) => {
  router.delete('/analysis/:analysisId',
    app.helpers.routes.func(require('./func.js')))
}