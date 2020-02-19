const Axios = require('axios')

module.exports = async function(title, body, devicesTokens) {
  const ENDPOINT = 'https://fcm.googleapis.com/fcm/send'

  const headers = {
    'Content-Type' : 'application/json',
    'Authorization' : process.env.GOOGLE_FCM_KEY
  }

  const payload = {
    'registration_ids': devicesTokens,
    'priority' : 'high',
    'notification':{
      'title': title,
      'body': body,
      'sound': 'default',
      'click_action':'FCM_PLUGIN_ACTIVITY'
    }
  }

  return (await Axios.post(ENDPOINT, payload, { headers })).data
}