const app = require('@/app')
const restify = require('express-restify-mongoose')
var guard = require('express-jwt-permissions')()

restify.serve(app.router, app.models.subjects, {
  prefix: '',
  version: '',
  lean: { virtuals: true },
  totalCountHeader: true,
  runValidators: true,
  preRead: [app.helpers.rest.paginate],
  preCreate: guard.check([['admin'],['subjects:write']]),
  // preUpdate: guard.check('users:write'),
  // preDelete: guard.check('users:write'),
  outputFn: app.helpers.rest.outputFn,
  only: ['get', 'create']
})