const app = require('@/app')

module.exports = function (agenda) {
  agenda.define('sendConfirmation', app.helpers.agenda.wrap(sendConfirmation))
}

async function sendConfirmation (user) {
  // create a token in order for the user to confirm
  const token = app.helpers.crypt.encrypt(JSON.stringify({ email: user.email }))

  // build email
  const email = {
    recipient: user.email,
    body: {
      url: `${app.config.WEB_URL}/confirm?token=${token}`
    }
  }

  // send email
  const TEMPLATE_ID = app.config.mailer.TEMPLATES.CONFIRMATION
  await app.helpers.mailer.send(email, {}, TEMPLATE_ID)
}

module.exports.sendConfirmation = sendConfirmation