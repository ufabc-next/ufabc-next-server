const app = require('@/app')

module.exports = async function() {
  const Groups = app.models.groups
  const Enrollments = app.models.enrollments

  const startedAt = new Date()

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
    }
  ]

  let data = await Enrollments.aggregate(pipeline)

  await Groups.remove({})

  await Groups.create(data.map(doc => {
    return { ...doc._id, users: doc.users }
  }))

  return { success: true, time: `${new Date() - startedAt} ms`}
}