const stream = require('stream')

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
module.exports = (func) => {
  return async (req, res, next) => {
    // Context that will be passed to func
    let context = req

    try {
      // Compute func and check the permission
      let result = await func(context, res)

      // Set status to 204 (No Content) if undefined
      if (result === undefined) {
        res.status(204)
      }

      // If response is a stream, pipe to output
      if (result instanceof stream.Readable) {
        return result.pipe(res)
      }

      // Redirect if _redirect key
      if (result && result._redirect) {
        return res.redirect(result._redirect)
      }

      // Respond the request
      res.send(result)
    } catch(e) {
      next(e)
    }
  }
}