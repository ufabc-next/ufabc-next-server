/* 
 * Blocks any requests that are not from the admin community.
 * Allows only if from admin community and has explicit `admin` priviledges
 */
const app = require('@/app')
const errors = require('@/errors')

const rule = require('@/helpers/routes/rule')

module.exports = rule(async (context) => {
  // must have a key to acess this routes
})