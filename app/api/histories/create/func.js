const app = require('@/app')
const moment = require('moment')

module.exports = async function (context) {
  const { 
    ra, 
    curso, 
    grade, 
    mandatory_credits_number, 
    limited_credits_number, 
    free_credits_number, 
    credits_total 
  } = context.body

  if(!ra) {
    return
  }

  if(curso && grade) {  
    const graduation = {
      locked: false,
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

    if(credits_total > 0){
      graduation.credits_total = credits_total
    }

    const doc = await app.models.graduation.findOne({ curso: curso, grade: grade }).lean(true)
    if(!doc || !doc.locked){
      await app.models.graduation.findOneAndUpdate({
        curso: curso,
        grade: grade,
      }, graduation, {
        upsert: true,
        new: true
      })
    }
  }

  await app.models.histories.findOneAndUpdate({
    ra: ra,
    // only let update history once per hour
    // since this creates too much propagation on enrollments
    updatedAt: { $lte: moment().subtract(1, 'hour').toDate() }
  }, context.body, {
    upsert: true,
    new: true
  })

  return {
    ok: Date.now()
  }
}