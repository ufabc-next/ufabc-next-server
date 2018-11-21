const app = require('@/app')

module.exports = async function (context) {
  app.redis.publish('historySync', {})
  return {
    status: 'published'
  }
}