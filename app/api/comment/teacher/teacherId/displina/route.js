const app = require('@/app')

module.exports = async(router) => {
  router.get('/comment/:teacherId/disciplina',
    app.helpers.routes.func(require('./func.js')))
}

//TODO change route name