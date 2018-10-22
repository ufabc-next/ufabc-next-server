const requireSmart = require('require-smart')

// Load helpers into app.helper
module.exports = async(app) => {
  return module.exports = requireSmart('../helpers', {
    skip: [/spec\.js$/],
  })
}