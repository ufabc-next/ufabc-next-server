/*
 * Start listening on specified port
 */
module.exports = async (app) => {
  // Bind server to port
  app.server.set('port', app.config.PORT)
  await app.server.listen(app.server.get('port'))
}
