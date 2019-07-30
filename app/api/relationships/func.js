const app = require('@/app')
const errors = require('@/errors')

module.exports = async function(context) {
  const DEPTH = 3
  const { RA } = context.params
  if(!RA) throw new errors.BadRequest(`Missing RA: ${RA}`)

  let nodes = [ { data: { id: RA, label: RA, 'color': '#f9b928' }}]
  let edges = []
  let mainStudent = RA
  let usedRAs = []

  var i = 1

  for(var dep = 0; dep <= DEPTH; dep++) {
    console.log('main student is => ', mainStudent)
    usedRAs.push(mainStudent)
    let students = await enrollmentsByRA(mainStudent)
    students.map(student => {
      if(usedRAs.includes(student[0])) return

      nodes.push({ data: { id: student[0], label: student[0], 'color': '#007bff' }})

      if(mainStudent == student[0]) return

      edges.push({ data: { source: mainStudent, target: student[0], recurrence: student[1], width: (Math.pow(student[1], 1.3)) }})
    })
    mainStudent = students[0][0]
    while(usedRAs.includes(mainStudent)) {
      mainStudent = students[i][0]
      i++
    }
  }

  const colors = ['#ea3453', '#e85971', '#e47184', '#e48998', '#e8b1ba']

  var count = 0

  for(var node in nodes) {
    if(usedRAs.includes(nodes[node].data.id) && nodes[node].data.id != RA) {
      nodes[node].data.color = colors[count] || '#e8b1ba'
      count++
    }
  }

  return { nodes, edges }
}

async function enrollmentsByRA(RA) {
  const Enrollments = app.models.enrollments
  const pipeline = [
    {
      $match: {
        mainTeacher: { $ne: null },
      }
    },
    {
      $group: {
        _id: {
          disciplina: '$disciplina',
          season: '$season',
          mainTeacher: '$mainTeacher'
        },
        users: {
          $push: '$ra'
        }
      }
    },
    {
      $match: {
        users: Number(RA)
      }
    },
    {
      $sort: {
        users: -1
      }
    }
  ]
  const data = await Enrollments.aggregate(pipeline)

  const Students = []

  data.map(student => {
    Students.push(...student.users)
  })

  var recurrentStudents = {}

  Students.map(student => {
    recurrentStudents[student] = recurrentStudents[student] === undefined ? 1 : recurrentStudents[student] + 1
  })

  var orderedRecurrentStudents = Object.keys(recurrentStudents)
    .sort(function(a, b){ return recurrentStudents[a] - recurrentStudents[b] })
    .filter(student => student != RA)
    .reverse()

  var response = []

  orderedRecurrentStudents.map(student => {
    response.push([student, recurrentStudents[student]])
  })

  return response.slice(0,8)
}