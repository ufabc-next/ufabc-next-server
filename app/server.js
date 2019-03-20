// Install tracer (must be the first thing in order to properly work)
require('dotenv').config()
if (process.env.GCLOUD_PROJECT && process.env.GCLOUD_CREDENTIALS) {
  console.log('trace-agent enabled')
  let tracer = require('@google-cloud/trace-agent').start({
    projectId: process.env.GCLOUD_PROJECT,
    credentials: JSON.parse(process.env.GCLOUD_CREDENTIALS),
    // Enable Mongo Reporting
    enhancedDatabaseReporting: true,
    // Don't trace status requests
    ignoreUrls: ['/v1/status'],
  })
}

const chalk = require('chalk')

const app = require('./app')

const TAG = '[server]'

// Order of execution for setup steps
const pipeline = [
  // package.json information
  'package',
  // Global configurations
  'config',
  // Load app.helpers
  'helpers',
  // Load mongo
  'mongo',
  // Load models
  'models',
  // Load Redis,
  'redis',
  // Load Agenda
  'agenda',
  // Create base express server
  'server',
  // Add redirection behavior
  'redirect',
  // Create web app
  'static',
  // Generater Router for Restify
  'router',
  // Create api (/v1) routes and middlewares
  'api',
  // Create oauth helpers
  'oauth',
  // Bind to port and lift http app
  'lift',
]

async function serve(){
  console.info(TAG, chalk.dim('lifting...'))
  
  await app.bootstrap(pipeline)

  console.info(TAG, '       version:', chalk.white(app.package.version))
  console.info(TAG, '          port:', chalk.white(app.config.PORT))
  console.info(TAG, '           env:', chalk.white(app.config.ENV))

  try {
    let mongoUrl = new (require('url').URL)(app.config.MONGO_URL);
    console.info(TAG, '    mongo host:', chalk.white(mongoUrl.hostname))
    console.info(TAG, '    mongo   db:', chalk.white(mongoUrl.pathname))
  } catch (e) {}

  if (process.env.SHUTDOWN_ON_LIFT)
    process.exit(0)
}

// Listen for Application wide errors
process.on('SIGTERM', shutdown)
process.on('SIGINT' , shutdown)
process.on('unhandledRejection', handleError)
process.on('uncaughtException', handleError)

function shutdown() {
  app.agenda.stop(function() {
    process.exit(0)
  })
}

function handleError(e) {
  console.error('Fatal Error')
  console.error(e.stack)

  if (app.reporter) {
    console.error('Reporting...')
    app.reporter.report(e, () => {
      console.error('Reported. Exiting.')
      process.exit(1)    
    })
    return
  }
  
  console.error('Exiting.')
  process.exit(1)
}

serve()