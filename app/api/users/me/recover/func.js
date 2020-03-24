const app = require('@/app')
const errors = require('@/errors')

module.exports = async function(context) {
  const { email } = context.body
  if(!email) {
    throw new errors.BadRequest.MissingParameter('email')
  }

  /*
   * Make sure email is a string to prevent NoSQL injections
   */
  const Users = app.models.users
  const user = await Users.findOne({ email: String(email)}).lean(true)
  if(!user) {
    throw new errors.BadRequest(`Invalid email: ${email}`)
  }

  const mailer = app.helpers.mailer
  const TEMPLATE_ID = app.config.mailer.TEMPLATES.RECOVERY
  const RECOVERY_URL = app.config.RECOVERY_URL

  const payload = {
    recipient: user.email,
    body: {
      recovery_facebook: `${RECOVERY_URL}/facebook?userId=${user._id}`,
      recovery_google: `${RECOVERY_URL}/google?userId=${user._id}`
    }
  }

  await mailer.send(payload, {}, TEMPLATE_ID)
}