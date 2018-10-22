const errors = require('../../errors')

module.exports = (req, res, next) => {
  next(new errors.NotFound('Rota não encontrada'))
  // next(new errors.NotFound('This route was not found'))
}