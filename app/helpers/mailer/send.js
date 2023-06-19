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

  const escapeString = (str) => `\"${str.replace(/\//g, '\\/')}\"`

  let TemplateData

  if (templateId === 'Confirmation') {
    TemplateData = `{ \"url\":${escapeString(emails.body.url)} }`
  } else {
    TemplateData = `{ \"recovery_facebook\": ${escapeString(
      emails.body.recovery_facebook
    )}, \"recovery_google\": ${escapeString(emails.body.recovery_google)} }`
  }

  const personalizations = _.castArray(emails).map((e) =>
    ses
      .sendTemplatedEmail({
        Source: app.config.mailer.EMAIL,
        Destination: {
          ToAddresses: [e.recipient],
        },
        Template: templateId,
        TemplateData: TemplateData,
      })
      .promise()
  )

  try {
    await Promise.all(personalizations)
  } catch (err) {
    throw new errors.Unprocessable(err.message)
  }
}
