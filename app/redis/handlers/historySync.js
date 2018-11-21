const app = require('@/app')
const cachegoose = require('cachegoose')

module.exports = async function (message) {
  // find all histories
  const histories = await app.models.histories.find({})

  async function syncHistories(history){  
    await history.updateEnrollments()
  }

  await app.helpers.mapLimit(histories, syncHistories, 5)
}