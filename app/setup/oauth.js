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
  if(!app.config.isTest) {
    const accessToken = context.query.access_token
    const url = `https://graph.facebook.com/me?fields=id,name,email,picture&metadata=1&access_token=${accessToken}`
    const resp = await Axios.get(url)
    const faceUser = resp.data
  } else {
    const faceUser = {
      email: 'test@test.com',
    }
  }


  // check if user exists in database
  let user = await App.models.users.findOne({ $or: [{
    'oauth.email': faceUser.email
  }, {
    'oauth.facebook' : faceUser.id
  }]})
  
  if(user) {
    user.set('oauth.facebook', faceUser.id)
  } else {
    user = new App.models.users({
      oauth: {
        email: faceUser.email,
        facebook: faceUser.id
      }
    })
  }

  await user.save()
  return {
    _redirect: `${App.config.WEB_URL}/login?token=${user.generateJWT()}`
  }
}

async function google (context) {
  const accessToken = context.query.access_token
  const url = 'https://www.googleapis.com/plus/v1/people/me'
  const resp = await Axios.get(url, { headers: {
    Authorization: `Bearer ${accessToken}`
  }})

  const googleUser = resp.data

  let user = await App.models.users.findOne({ $or: [{
    'oauth.email': googleUser.emails[0].value
  }, {
    'oauth.facebook' : googleUser.id
  }]})
  
  if(user) {
    user.set('oauth.google', googleUser.id)
  } else {
    user = new App.models.user({
      oauth: {
        email: googleUser.emails[0].value,
        google: googleUser.id
      }
    })
  }

  await user.save()

  return {
    _redirect: `${App.config.WEB_URL}/login?token=${user.generateJWT()}`
  }
}