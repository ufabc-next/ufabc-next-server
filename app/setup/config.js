require('dotenv').config()

const path = require('path')
const HOUR = (1000 * 60 * 60)

// Load config variables and expose.
// Load occurs from:
//  > package.json
//  > process.env

module.exports = async() => {
  let config = {}
  
  config.ENV = getEnv('NODE_ENV', 'dev')
  config.PORT = getEnv('PORT') || getEnv('NODE_PORT', 8011)
  // config.HOST = getEnv('HOST', `${ip.address()}:${config.PORT}`)
  config.HOST = getEnv('HOST', `localhost:${config.PORT}`)
  config.PROTOCOL = getEnv('PROTOCOL', 'http')
  config.JWT_SECRET = getEnv('JWT_SECRET', 'DEV_JWT_KEY')
  config.MONGO_URL = getEnv('MONGO_URL', `mongodb://localhost:27017/ufabc-matricula-extension-${config.ENV}`)
  config.MONGO_URI = config.MONGO_URL

  config.WEB_URL = getEnv('WEB_URL', 'http://localhost:7500/app/#')

  // Config Redis
  config.REDIS_URL = getEnv('REDIS_URL', 'redis://localhost:6379')
  config.CACHE_NAME = getEnv('CACHE_NAME', 'ufabc-matricula-extension')

  config.SENTRY = getEnv('SENTRY', 'SENTRY_KEY') 

  config.ACCESS_KEY = getEnv('ACCESS_KEY', 'SOME_ACCESS_KEY')

  config.GOOGLE_FCM_KEY = getEnv('GOOGLE_FCM_KEY', 'GOOGLE_FCM_KEY')

  config.MATRICULAS_URL = getEnv('MATRICULAS_URL', 'http://localhost:8011/snapshot/assets/matriculas.js')
  config.DISCIPLINAS_URL = getEnv('DISCIPLINAS_URL', 'http://localhost:8011/snapshot/assets/todasDisciplinas.js')

  // Static assets (dist) configs
  config.distFolder= getEnv('DIST_FOLDER', path.join(__dirname, '../../dist'))
  config.docFolder= getEnv('DOC_FOLDER', path.join(__dirname, '../doc'))
  config.maxAge =  1 * HOUR

  // Matricula snapshot
  config.snapshotFolder = getEnv('DIST_FOLDER', path.join(__dirname, '../snapshot'))

  // state
  config.isProduction = config.ENV == 'production'
  config.isTest = config.ENV == 'test'
  config.isDev = !config.isProduction && !config.isTest

  config.mailer = {
    API_KEY: getEnv('SENDGRID_KEY', 'SENDGRID_KEY'),
    ENDPOINT: 'https://api.sendgrid.com/v3/mail/send',
    EMAIL: getEnv('SENDGRID_EMAIL', 'contato@ufabcnext.com'),
    // configuration for the mail templates 
    TEMPLATES : {
      CONFIRMATION: getEnv('EMAIL_TEMPLATE_CONFIMATION', null), 
    },
  }

  config.GRANT_SECRET = getEnv('GRANT_SECRET',  'SOME_RANDOM_SECRET'),
  config.GRANT_CONFIG = {
    defaults: {
      protocol: config.PROTOCOL,
      host: config.HOST,
    },
    facebook: {
      key: getEnv('OAUTH_FACEBOOK_KEY', 'OAUTH_FACEBOOK_KEY') ,
      secret: getEnv('OAUTH_FACEBOOK_SECRET', 'OAUTH_FACEBOOK_SECRET'),
      callback: '/oauth/facebook',
      scope: [
        'public_profile',
        'email'
      ]
    },
    google: {
      key: getEnv('OAUTH_GOOGLE_KEY', 'OAUTH_GOOGLE_KEY'),
      secret: getEnv('OAUTH_GOOGLE_SECRET', 'OAUTH_GOOGLE_SECRET'),
      callback: '/oauth/google',
      scope: [
        'profile',
        'email'
      ]
    }
  }

  // Configuration for Mongo Tenant plugin
  config.mongoTenant = {
    // Whether the mongo tenant plugin MAGIC is enabled.
    enabled: true,
    // The name of the tenant id field.
    tenantIdKey: 'season',
    // The type of the tenant id field.
    tenantIdType: String,
    // The name of the tenant id getter method.
    tenantIdGetter: 'getSeason',
    // The name of the tenant bound model getter method.
    accessorMethod: 'bySeason',
  }


  return config
}

function getEnv(env, defaults) {  
  return process.env[env] || defaults
}
