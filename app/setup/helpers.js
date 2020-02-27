const requireSmart = require('require-smart')

// Load helpers into app.helper
module.exports = async() => {
  return module.exports = requireSmart('../helpers', {
    skip: [/spec\.js$/],
  })
}