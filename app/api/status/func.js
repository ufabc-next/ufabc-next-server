const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context, res) => {
  const user = await app.models.users.findOne({})

  return {
    status: 'alive',
    now: Date.now(),
    return: await user.generateJWT()
  }
}
