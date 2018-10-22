const fs = require('fs')
const path = require('path')

module.exports = (name) => {
  let p = path.join(__dirname, `../../fixtures/${name}`)
  return { data : fs.readFileSync(p, 'utf8')}
}