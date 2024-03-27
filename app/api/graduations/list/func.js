const app = require('@/app')

module.exports = async function func() {
  const Graduation = await app.models.graduation
  const graduations = await Graduation.find({}).lean()

  const Subject = await app.models.subjects
  const SubjectGraduations = await app.models.subjectGraduations

  const populatedGraduations = await Promise.all(
    graduations.map(async (graduation) => {
      const subjectsGraduations = await SubjectGraduations.find({
        graduation: graduation._id,
      }).lean()

      const subjects = (
        await Promise.all(
          subjectsGraduations.map(async (subjectGraduation) => {
            const subject = await Subject.findOne({
              _id: subjectGraduation.subject,
            }).lean()
            return {
              ...subjectGraduation,
              subject,
            }
          })
        )
      ).reduce((acc, subject) => {
        const category = subject.category
        if (!category) {
          return acc
        }
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(subject)
        return acc
      }, {})

      return {
        ...graduation,
        subjects,
      }
    })
  )

  return populatedGraduations
}
