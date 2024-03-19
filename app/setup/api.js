const _ = require('lodash')
const glob = require('glob')
const path = require('path')
const express = require('express')
const fallback = require('express-history-api-fallback')

/*
 * Load routes from api
 */
module.exports = async (app) => {
  // Create secondary router for '/api/*'
  let api = express()

  // If delay mode is enabled, inject middleware to slowdown things
  if (app.config.DEBUG_DELAY) {
    api.use((req, res, next) => {
      setTimeout(next, app.config.DEBUG_DELAY * 1)
    })
  }

  // Authenticate user
  api.use(
    [
      '/users/info',
      '/users/complete',
      '/users/me/resend',
      '/users/me/grades',
      '/users/me/delete',
      '/users/me/devices',
      '/enrollments',
      '/comments',
      '/reactions',
      '/histories/courses',
      '/users/me/relationships',
      '/graduation',
      '/graduations/stats',
      '/subjectGraduations',
      '/historiesGraduations',
      '/students/aluno_id',
      '/subjects',
    ],
    app.helpers.middlewares.auth
  )

  // Protect Private routes
  api.use('/private', app.helpers.middlewares.private)

  // Locate route files from api folder
  let cwd = path.join(__dirname, '../api')
  let routerPaths = glob.sync('**/*route.js', { cwd })

  // Require route files
  let routers = routerPaths.map((file) => require(path.join(cwd, file)))

  // user a temporary router to order
  let tmpRoute = express()

  // Install routes
  for (let route of routers) {
    await route(tmpRoute)
  }

  // Order routes by path priority
  app.helpers.routes.order(tmpRoute)

  // get ordered router and apply on api
  tmpRoute._router.stack.forEach(function (currentRoute) {
    let path = _.get(currentRoute, 'route.path')
    let stack = _.get(currentRoute, 'route.stack', [])
    let method = _.get(currentRoute, 'route.stack[0].method')
    let functions = stack.map((s) => s.handle)

    if (method) {
      api[method](path, ...functions)
    }
  })

  tmpRoute = null

  // Locate express-restify-mongoose files
  let restPaths = glob.sync('**/*rest.js', { cwd })
  restPaths.map((file) => require(path.join(cwd, file)))

  // Add rest to api
  api.use(app.router)

  // Server errors and Not Found
  api.use('*', app.helpers.middlewares.notFound)
  api.use('*', app.helpers.middlewares.error)

  // Install into `/v1` route
  app.server.use('/v1', api)

  // Default errors
  // app.server.use('*', app.helpers.middlewares.notFound)
  // app.server.use('*', app.helpers.middlewares.error)
  app.server.use(fallback('index.html', { root: app.config.distFolder }))

  // Return api router
  return api
}
