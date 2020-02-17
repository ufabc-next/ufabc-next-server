const app = require('@/app')
const errors = require('@/errors')

module.exports = async (context, res) => {
  return {
    status: 'alive',
    now: Date.now()
  }
}
