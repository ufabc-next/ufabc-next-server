/*
 * Converts an async function to a resolvable wrapper for express middlewares
 *
 * Example:
 *  async function fn (context) {
 *    if((await somePromisse).someKey)
 *      return true
 *
 *    return false
 *  }
 *
 */
module.exports = (rule) => {
  return async (req, res, next) => {
    // Context that will be passed to rule
    let context = req

    try {
      // Compute rule and check the permission
      await rule(context)

      // Proceed with the request
      next()
    } catch(e) {
      next(e)
    }
  }
}