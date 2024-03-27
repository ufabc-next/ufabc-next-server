const app = require('@/app')

module.exports = async function func(context) {
  const { ra } = context.user
  if (!ra) {
    return []
  }
  const graduationId = context.params.id
  const Graduation = await app.models.graduation
  const graduation = await Graduation.findOne({
    _id: graduationId,
  }).lean()

  const Subject = await app.models.subjects
  const SubjectGraduations = await app.models.subjectGraduations
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

  const populatedGraduation = {
    ...graduation,
    subjects,
  }

  const enrollments = await app.models.enrollments
    .find(
      {
        ra,
        conceito: { $in: ['A', 'B', 'C', 'D', 'O', 'F'] },
      },
      {
        conceito: 1,
        subject: 1,
        disciplina: 1,
        pratica: 1,
        teoria: 1,
        year: 1,
        quad: 1,
        creditos: 1,
        updatedAt: 1,
        comments: 1,
      }
    )
    .populate(['pratica', 'teoria', 'subject'])
    .lean(true)

  const mandatories = populatedGraduation.subjects.mandatory.filter(
    (subject) => {
      return enrollments.some((enrollment) => {
        if (!enrollment.subject || !subject.subject) {
          return false
        }
        return (
          enrollment.subject._id.toString() === subject.subject._id.toString()
        )
      })
    }
  )

  const limited = populatedGraduation.subjects.limited.filter((subject) => {
    return enrollments.some((enrollment) => {
      if (!enrollment.subject || !subject.subject) {
        return false
      }
      return (
        enrollment.subject._id.toString() === subject.subject._id.toString()
      )
    })
  })

  const invalidGrades = ['O', 'F']

  return {
    percentage: {
      mandatories:
        mandatories.length / populatedGraduation.subjects.mandatory.length,
      limited: limited.length / populatedGraduation.subjects.limited.length,
    },
    credits: {
      mandatories: {
        done: mandatories.reduce((acc, subject) => {
          return acc + subject.subject.creditos
        }, 0),
        total: populatedGraduation.subjects.mandatory.reduce((acc, subject) => {
          return acc + subject.subject.creditos
        }, 0),
      },
      limited: {
        done: limited.reduce((acc, subject) => {
          return acc + subject.subject.creditos
        }, 0),
        total: populatedGraduation.limited_credits_number,
      },
    },
    missing: {
      mandatories: populatedGraduation.subjects.mandatory.filter((subject) => {
        return !mandatories.some((enrollment) => {
          const completed = !invalidGrades.includes(enrollment.conceito)
          if (!completed) return false

          return (
            enrollment.subject._id.toString() === subject.subject._id.toString()
          )
        })
      }),
      limited: populatedGraduation.subjects.limited.filter((subject) => {
        return !limited.some((enrollment) => {
          const completed = !invalidGrades.includes(enrollment.conceito)
          if (!completed) return false

          return (
            enrollment.subject._id.toString() === subject.subject._id.toString()
          )
        })
      }),
    },
  }
}
