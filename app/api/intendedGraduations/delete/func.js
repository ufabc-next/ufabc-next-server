const app = require('@/app')
const errors = require('@/errors')

module.exports = async function(context){
  let { graduationId } = context.params;
  let intendedGraduation = await app.models.intendedGraduation.findOne({
     graduation: graduationId,
     user: context.user._id,
     active: true 
    })


  if(!intendedGraduation) throw new errors.BadRequest(`Intended graduation not found (or inactive) for user.`)

  intendedGraduation.active = false

  await intendedGraduation.save()

  return { status: 'ok', message: 'Intended graduation inactivated for this user on database.'}
}