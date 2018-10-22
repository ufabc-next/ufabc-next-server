const removeDiacritics = require('./removeDiacritics')

module.exports = function cleanString(str) {
  return removeDiacritics((str || '').toLowerCase()).replace(/\s+/g, ' ')
}
