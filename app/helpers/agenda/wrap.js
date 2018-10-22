const app = require('@/app')
const Raven = require('raven')

module. exports = (fn) => {
  return async (job, done) => {
    try {
      job.attrs.result = await fn(job.attrs.data)
      done()
    } catch (e) {
      Raven.captureException(e)
      done(e)
    }
  }
}