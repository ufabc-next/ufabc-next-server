const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')
const SES = require('aws-sdk/clients/ses')

module.exports = async function send(emails, sender = {}, templateId) {
  const ses = new SES({
    accessKeyId: app.config.AWS_ACCESS_KEY_ID,
    secretAccessKey: app.config.AWS_SECRET_ACCESS_KEY,
    region: app.config.AWS_REGION,
  })

  let TemplateData

  if (templateId === 'Confirmation') {
    TemplateData = JSON.stringify({ url: emails.body.url });
  } else {
    TemplateData = JSON.stringify({
      recovery_facebook: emails.body.recovery_facebook,
      recovery_google: emails.body.recovery_google,
    });
  }

  const personalizations = _.castArray(emails).map((e) =>
    ses
      .sendTemplatedEmail({
        Source: app.config.mailer.EMAIL,
        Destination: {
          ToAddresses: [e.recipient],
        },
        Template: templateId,
        TemplateData,
      })
      .promise()
  )

  try {
    await Promise.all(personalizations)
  } catch (err) {
    throw new errors.Unprocessable(err.message)
  }
}
