module.exports = function outputFn (req, res) {
  // if we are in a LIST route, we should use out pagination pattern
  if('totalCount' in req.erm) {
    req.erm.result = {
      docs: req.erm.result,
      total: req.erm.totalCount,
      page: req.query.page,
      limit: req.query.limit,
      pages: Math.ceil(req.erm.totalCount / req.query.limit) || 1
    }
  }

  // this is the default outputFn as in express-restify-mongoose
  if (req.erm.result) {
    res.status(req.erm.statusCode).json(req.erm.result)
  } else {
    res.sendStatus(req.erm.statusCode)
  }
}