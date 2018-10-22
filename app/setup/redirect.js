/*
 * Redirect requests in production to https. 
 * Block requests without host.
 */
module.exports = async (app) => {
  // If not in production, skip redirection
  if (app.config.ENV != 'production')
    return;

  if (app.config.HOST.startsWith('localhost'))
    return;

  app.server.use((req, res, next) => {
    let headers = req.headers
    
    // Get headers
    let host = headers['host']
    let protocol = headers['x-forwarded-proto']

    // Check if should upgrade to https
    if (protocol !== undefined && protocol != 'https') {
      let target = `https://${host}${req.url}`
      return res.redirect(target)
    }
    
    next()
  })
}
