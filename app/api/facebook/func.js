const app = require('@/app')

module.exports = async (context) => {
  let { ra, email } = context.body.ra

  const user = await app.models.users.findOne({ ra, email })

  if (user) {
    const { _id } = user
    return { userId: _id }
  }

  return null
}
