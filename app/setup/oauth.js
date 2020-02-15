const session = require('express-session')
const grant = require('grant-express')
const Axios = require('axios')
const App = require('@/app')

module.exports = async (app) => {
  app.server
    .use(session({ secret: app.config.GRANT_SECRET, saveUninitialized: true, resave: true }))

    .use(grant(app.config.GRANT_CONFIG))
    .get('/oauth/facebook', app.helpers.routes.func(facebook))
    .get('/oauth/google', app.helpers.routes.func(google))
}

async function facebook (context) {
  const { inApp = false, userId = null } = _.get(context.session, 'grant.dynamic', {})

  const accessToken = context.query.access_token
  const url = `https://graph.facebook.com/me?fields=id,name,email,picture.width(640)&metadata=1&access_token=${accessToken}`
  const resp = await Axios.get(url)

  const faceUser = resp.data
  
  if(!faceUser.id) {
    throw new Error('Missing faceUser.id')
  }

  // check if user exists in database
  let user = await App.models.users.findOne({
    'oauth.facebook' : faceUser.id
  })
  
  if(user) {
    user.set('oauth.facebook', faceUser.id)
  } else {
    user = new App.models.users({
      oauth: {
        email: faceUser.email,
        facebook: faceUser.id,
        picture: faceUser.picture.data.url
      }
    })
  }

  await user.save()
  
  return {
    _redirect: inApp == 'true'
      ? `ufabcnext://login?token=${await user.generateJWT()}&`
      :`${App.config.WEB_URL}/login?token=${user.generateJWT()}`
  }
}

async function google(context) {
  const { inApp = false, userId = null } = _.get(context.session, 'grant.dynamic', {})

  const accessToken = context.query.access_token
  const url = 'https://www.googleapis.com/plus/v1/people/me'
  const resp = await Axios.get(url, { headers: {
    Authorization: `Bearer ${accessToken}`
  }})

  const googleUser = resp.data

  if(!googleUser.id) {
    throw new Error('Missing googleUser.id')
  }

  let user = await App.models.users.findOne({
    'oauth.google' : googleUser.id
  })

  if(user) {
    user.set('oauth.google', googleUser.id)
  } else {
    user = new App.models.users({
      oauth: {
        email: googleUser.emails[0].value,
        google: googleUser.id
      }
    })
  }

  await user.save()

  return {
    _redirect: inApp == 'true'
      ? `ufabcnext://login?token=${await user.generateJWT()}&`
      :`${App.config.WEB_URL}/login?token=${user.generateJWT()}`
  }
}