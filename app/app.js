const chalk = require('chalk')
const path = require('path')

const TAG = '[app]'
const duration = require('./helpers/duration')

const app = module.exports = {}

// Loads a single script and saves it's results to app
async function load(app, step, silently) {
  // Debug step
  let status = `${TAG} load:${chalk.yellow(step)}`

  // Fill with …………
  let fill = chalk.dim('…'.repeat(12 - step.length))

  // Save result of step
  try {
    let time = Date.now()
    let result = await require('./setup/' + step)(app)

    if (!silently)
      console.info(status, fill, chalk.dim(duration(Date.now() - time)))

    // Save output into the name
    if (result !== undefined) {
      app[step] = result
    }
  } catch (e) {
    if (!silently)
      console.error(status, fill, chalk.red('failed'))
    console.error(e)
    process.exit(1)
  }
}

app.bootstrap = async function bootstrap(pipeline, silently = false) {
  let start = Date.now()

  for (var i in pipeline) {
    let step = pipeline[i]

    await load(app, step, silently)
  }

  let liftDuration = duration(Date.now() - start)

  // Fill with …………
  let step = 'lifted'
  let fill = chalk.dim('…'.repeat(17 - step.length))

  if (!silently)
    console.info(TAG, `${chalk.green(step)} ${fill} ${chalk.dim(liftDuration)}`)
}


/*
 * Allow @ to point to root directory in require
 */
var Module = require('module')
var originalRequire = Module.prototype.require

Module.prototype.require = function (name, ...args) {
  if (name.startsWith('@/')) {
    let absolute = path.join(__dirname, name.substring(1))
    return originalRequire.apply(this, [absolute, ...args])
  }

  return originalRequire.apply(this, arguments);
}