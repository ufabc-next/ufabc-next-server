const _ = require('lodash')
const app = require('@/app')
const difflib = require('difflib')

module.exports = async function findId(course, season) {
  const clearString = app.helpers.transform.clearString
  let courses = await app.helpers.courses.findIds(season)
  
  course = clearString(course)
  let courseNames = _.map(courses, p => clearString(p.name))
  let courseMap = new Map([...courses.map(h => [clearString(h.name), h])])
  let closestMatch = _.get(difflib.getCloseMatches(course, courseNames), '[0]', null)
  
  if(!closestMatch) return null
  return _.get(courseMap.get(closestMatch), 'curso_id', null)
}