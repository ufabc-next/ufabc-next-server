const app = require('@/app')
const errors = require('@/errors')

module.exports = async function(context) {
  const RA = String(context.user.ra)

  var MAX_BREADTH = Math.min(Math.max(context.query.breadth, 1), 5) || 5
  var MAX_DEPTH = Math.min(Math.max(context.query.depth, 1), 3) || 3

  let nodes = [ { data: { id: RA, label: RA, 'color': '#f9b928' }} ]
  let edges = []

  let usedRAs = []

  let DEPTH_COUNT = 0

  async function searchRelationships(mainStudent, DEPTH) {
    if(DEPTH > MAX_DEPTH) return

    let students = await enrollmentsByRA(mainStudent, MAX_BREADTH)

    addStudents(students, mainStudent, DEPTH)

    DEPTH_COUNT++

    await Promise.all(students.map(async student => {
      await searchRelationships(student[0], DEPTH_COUNT)
    }))
  }

  function addStudents(students, mainStudent, DEPTH) {
    students.map((student, index) => {
      if(usedRAs.includes(student[0])) return

      nodes.push({
        data: {
          id: student[0],
          label: student[0],
          color: '#007bff',
          depth: DEPTH
        }
      })

      if(mainStudent == student[0]) return

      edges.push({
        data: {
          source: mainStudent,
          target: student[0],
          recurrence: student[1],
          width: (Math.pow(student[1], 1.3))
        }
      })
    })
  }

  await searchRelationships(RA, DEPTH_COUNT)

  return { nodes: replaceNodesColor(nodes), edges }

}

function replaceNodesColor(nodes) {
  const colors = ['#ea3453', '#e85971', '#e47184', '#e48998', '#e8b1ba']

  nodes.forEach(node => {
    node.data.color = colors[node.data.depth] || '#007bff'
  })

  return nodes
}

async function enrollmentsByRA(RA, MAX_BREADTH) {
  const Groups = app.models.groups

  var usersGroups = await Groups.find({ users: RA })

  if(!usersGroups) throw new errors.BadRequest(`Invalid user RA`)

  const allRelatedUsers = []

  usersGroups.map(student => {
    allRelatedUsers.push(...student.users)
  })

  var recurrentStudents = {}

  allRelatedUsers.map(student => {
    recurrentStudents[student] = recurrentStudents[student] === undefined ? 1 : recurrentStudents[student] + 1
  })

  var orderedRecurrentStudents = Object.keys(recurrentStudents)
    .sort(function(a, b){ return recurrentStudents[a] - recurrentStudents[b] })
    .filter(student => student != RA)
    .reverse()

  var orderedUsersRelatedWithRecurrence = []

  orderedRecurrentStudents.map(student => {
    orderedUsersRelatedWithRecurrence.push([student, recurrentStudents[student]])
  })

  return orderedUsersRelatedWithRecurrence.slice(0, MAX_BREADTH)
}