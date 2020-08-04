const app = require('@/app')

module.exports = async(router) => {
  router.get('/students/aluno_id',
    app.helpers.routes.func(require('./func.js')))
}