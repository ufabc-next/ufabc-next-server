const app = require('@/app')
//test
module.exports = async(router) => {
  router.get('/relationships/:RA',
    app.helpers.routes.func(require('./func.js')))
}