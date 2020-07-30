const app = require('@/app')

module.exports = async function (context) {
  const { ra, curso, grade, mandatory_credits_number, limited_credits_number, free_credits_number } = context.body

  if(!ra) {
    return
  }

  if(!curso || !grade) {  
    const graduation = {
      name: curso,
      grade: grade,

    }
    if(mandatory_credits_number > 0) {
      graduation.mandatory_credits_number = mandatory_credits_number
    }

    if(limited_credits_number > 0) {
      graduation.limited_credits_number = limited_credits_number
    }

    if(free_credits_number > 0){
      graduation.free_credits_number = free_credits_number 
    }

    await app.models.graduation.findOneAndUpdate({
      curso: curso,
      grade: grade,
      locked: false,
    }, graduation, {
      upsert: true,
      new: true
    })
  }

  await app.models.histories.findOneAndUpdate({
    ra: ra
  }, context.body, {
    upsert: true,
    new: true
  })
}