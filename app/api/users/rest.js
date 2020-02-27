const app = require('@/app')
const restify = require('express-restify-mongoose')

restify.serve(app.router, app.models.users, {
  prefix: '',
  version: '',
  access() {
    return 'protected'
  },
  writeAccess() {
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