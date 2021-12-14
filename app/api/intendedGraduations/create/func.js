const app = require('@/app')

module.exports = async function (context) {
  let { graduationId } = context.params;
  console.log(graduationId)
  let intendedGraduation = await app.models.intendedGraduation.findOne({
    graduation: graduationId,
    user: context.user._id,
    active: true
  })
  console.log(intendedGraduation)
  if(intendedGraduation) throw new errors.BadRequest(`Inteded graduation already selected for this user.`)


  const newintendedGraduation = await app.models.intendedGraduation.create({
    graduation: graduationId,
      user: context.user
    }
  )

  return newintendedGraduation
}