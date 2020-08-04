const _ = require('lodash')
const app = require('@/app')
const restify = require('express-restify-mongoose')

async function addSelf(req, _res, next) {
  _.extend(req.query, { ra: req.user.ra })
  
  if (Array.isArray(req.body)) {
    req.body.forEach(param => _.extend(param, { user: req.user.ra }))
  } else {
    _.extend(req.body, { ra: req.user.ra })
  }

  next()
}

restify.serve(app.router, app.models.historiesGraduations, {
  prefix: '',
  version: '',
  lean: { virtuals: true },
  totalCountHeader: true,
  runValidators: true,
  preRead: [app.helpers.rest.paginate],
  // preCreate: guard.check('users:write'),
  // preUpdate: guard.check('users:write'),
  // preDelete: guard.check('users:write'),
  preMiddleware: [addSelf],
  outputFn: app.helpers.rest.outputFn,
  only: ['list', 'get']
})