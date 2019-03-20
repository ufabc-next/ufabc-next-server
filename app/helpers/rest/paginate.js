const _ = require('lodash')
const aqp = require('api-query-params')

module.exports = function paginate(req, res, next) {
  // use aqp to transform query
  const omitOperators = ['page', 'populate', 'select', 'sort', 'skip']
  req.erm.query.query = aqp(_.omit(req.query, omitOperators)).filter

  // enforce max limit on queries
  req.erm.query.limit = Math.min(req.erm.query.limit || 10, 100)
  req.query.limit = req.erm.query.limit

  // force page is not passed
  if(!('page' in req.query)) {
    req.query.page = 1
  }
  
  // normalize page
  req.query.page = parseInt(req.query.page)
  if(isNaN(req.query.page)){
    req.query.page = 1
  }

  // calculate how much we should skip based on page and limit
  req.erm.query.skip = (req.query.page - 1) * req.erm.query.limit

  next()
}