const Sentry = require('@sentry/node')

module. exports = (fn) => {
  return async (job, done) => {
    try {
      job.attrs.result = await fn(job.attrs.data)
      done()
    } catch (e) {
      Sentry.captureException(e)
      done(e)
    }
  }
}