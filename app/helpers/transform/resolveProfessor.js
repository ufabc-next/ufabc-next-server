const _ = require('lodash')
const difflib = require('difflib')
const errors = require('@/errors')

module.exports = function resolveProfessor(name, teachers, mappings = {}) {
  name =  _.startCase(_.camelCase(name))

  const foundTeacher =
    _.find(teachers, { name: name }) ||
    _.find(teachers, { name: mappings[name] }) ||
    _.find(teachers, (teacher) => (teacher.alias || []).includes(name))

  if(!name) return null
  else if(name == 'N D' || name == 'Falso') return null
  else if (foundTeacher) {
    return foundTeacher
  }
  else {
    let bestMatch = difflib.getCloseMatches(name, _.map(teachers, 'name'))[0]
    let s = new difflib.SequenceMatcher(null, bestMatch, name);
    if(s.ratio() > 0.8) return _.find(teachers, { name: bestMatch })
    else {
      return { error : 'Missing Teacher: ' + name }
    }
  }
}