const app = require('@/app')

module.exports = async (context) => {
  const { ra, email } = context.body

  const user = await app.models.users.findOne({ ra, 'oauth.emailFacebook': email })
  
  if (!user) {
    return {
      error: user,
      msg: 'User does not exist'
    }
  }

  return {
    token: user.generateJWT()
  }
}
