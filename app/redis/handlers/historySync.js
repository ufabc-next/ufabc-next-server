const app = require('@/app')

module.exports = async function () {
  // find all histories
  const histories = await app.models.histories.find({})

  async function syncHistories(history){  
    await history.updateEnrollments()
  }

  await app.helpers.mapLimit(histories, syncHistories, 5)
}