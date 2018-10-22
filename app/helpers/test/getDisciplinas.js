const fs = require('fs')
const path = require('path')

module.exports = () => {
  let p = path.join(__dirname, '../../fixtures/todasDisciplinas.js')
  return { data : fs.readFileSync(p, 'utf8')}
}