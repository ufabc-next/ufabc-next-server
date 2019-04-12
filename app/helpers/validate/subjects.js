const _ = require('lodash')

module.exports = function(payload, subjects, extraMappings = {}) {
  let mapping = {}

  _.extend(mapping, extraMappings)

  const mapSubjects = _.map(subjects, 'search')

  return _.castArray(payload).reduce((acc, d) => {
    const converted = _.startCase(_.camelCase(d.disciplina))
    const convertedMapping = _.startCase(_.camelCase(mapping[d.disciplina]))

    if(!mapSubjects.includes(converted) && !mapSubjects.includes(convertedMapping) ) {
      acc.push(d.disciplina)
    }
    const subject = _.find(subjects, { search: converted })
    const subjectMapping = _.find(subjects, { search: convertedMapping })
    // set subject on discipline
    d.disciplina = subjectMapping ? mapping[d.disciplina] : d.disciplina
    d.subject = _.get(subject, '_id', null) ||  _.get(subjectMapping, '_id', null)
    return acc
  }, []).filter(d => d != '' && d != null)
}