const _ = require('lodash')
const app = require('@/app')
const Axios = require('axios')
const errors = require('@/errors')

module.exports = async function send(emails, sender = {}, templateId) {
  const personalizations = _.castArray(emails).map(e => ({
    to: [{ email: e.recipient }],
    dynamic_template_data: e.body || {}
  }))

  const headers = {
    'Content-Type' : 'application/json',
    'Authorization' : `Bearer ${app.config.mailer.API_KEY}`
  }

  const payload = {
    'personalizations': personalizations,
    'from': {
      'email': app.config.mailer.EMAIL,
      'name':  sender.name || 'UFABC next'
    },
    'reply_to': {
      'email': sender.email || app.config.mailer.EMAIL,
      'name': sender.name || 'UFABC next'
    },
    'template_id': templateId
  }

  try {
    await Axios.post(app.config.mailer.ENDPOINT, payload, {
      headers: headers,
    })
  } catch (err) {
    throw new errors.Unprocessable(err.response.data)
  }
}