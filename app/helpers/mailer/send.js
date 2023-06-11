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

  const personalizations = _.castArray(emails).map((e) =>
    ses
      .sendEmail({
        Source: app.config.mailer.EMAIL,
        Destination: {
          ToAddresses: [e.recipient],
        },
        Template: templateId,
        TemplateData:
          templateId === 'Confirmation'
            ? `{ \"url\":\"${e.body.url.replace(/\//g, '\\/')}\" }`
            : `{ \"recovery_facebook\": \"${e.body.recovery_facebook.replace(
                /\//g,
                "\\/"
              )} \",recovery_google: \"${e.body.recovery_google.replace(
                /\//g,
                '\\/'
              )}\" }`,
      })
      .promise()
  )

  try {
    await Promise.all(personalizations)
  } catch (err) {
    throw new errors.Unprocessable(err.message)
  }
}
