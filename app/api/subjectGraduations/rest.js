const app = require('@/app')
const restify = require('express-restify-mongoose')
var guard = require('express-jwt-permissions')()

restify.serve(app.router, app.models.subjectGraduations, {
  prefix: '',
  version: '',
  lean: { virtuals: true },
  totalCountHeader: true,
  runValidators: true,
  preRead: [app.helpers.rest.paginate],
  preCreate: guard.check([['admin'],['subjectsGraduations:write']]),
  preUpdate: guard.check([['admin'],['subjectsGraduations:write']]),
  preDelete: guard.check([['admin'],['subjectsGraduations:write']]),
  outputFn: app.helpers.rest.outputFn
})