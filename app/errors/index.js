const requireSmart = require('require-smart')

module.exports = requireSmart('./', {skip: [/spec\.js$/, /index\.js/]})