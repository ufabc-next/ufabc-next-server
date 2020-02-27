const app = require('@/app')

module.exports = async function (context) {
  const { ra } = context.body

  if(!ra) {
    return
  }

  await app.models.histories.findOneAndUpdate({
    ra: ra
  }, context.body, {
    upsert: true,
    new: true
  })
}