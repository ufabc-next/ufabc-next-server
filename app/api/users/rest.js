const app = require('@/app')
const restify = require('express-restify-mongoose')
const guard = require('express-jwt-permissions')()

restify.serve(app.router, app.models.users, {
  prefix: '',
  version: '',
  access(req) {
    return 'protected'
  },
  writeAccess(req) {
    return 'protected'
  },
  lean: { virtuals: true },
  totalCountHeader: true,
  runValidators: true,
  preRead: [app.helpers.rest.paginate],
  // preCreate: guard.check('users:write'),
  // preUpdate: guard.check('users:write'),
  // preDelete: guard.check('users:write'),
  outputFn: app.helpers.rest.outputFn
})