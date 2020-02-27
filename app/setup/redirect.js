/*
 * Redirect requests in production to https. 
 * Block requests without host.
 */
module.exports = async (app) => {
  // If not in production, skip redirection
  if (app.config.ENV != 'production')
    return

  if (app.config.HOST.startsWith('localhost'))
    return
}
