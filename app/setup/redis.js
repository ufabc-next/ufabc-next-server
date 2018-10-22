const redis = require('redis')
const bluebird = require('bluebird')
const Cacheman = require('cacheman')
const requireSmart = require('require-smart')

module.exports = async (app) => {
  const OPTIONS = { url: app.config.REDIS_URL }

  // load handlers
  const HANDLERS = requireSmart('../redis/handlers', {
    skip: [/\..*\.js$/],
  })

  bluebird.promisifyAll(redis.RedisClient.prototype);
  bluebird.promisifyAll(redis.Multi.prototype);

  // create publisher connection
  const pub = redis.createClient(OPTIONS)

  // create subscribe connection
  const sub = redis.createClient(OPTIONS)

  // create handler ?
  sub.on('message', async function (channel, message) {
    try {
      // find handler for this channel and pass message to him
      await HANDLERS[channel](JSON.parse(message))
    } catch(e){
      // TODO - call raven
    }
  })

  // subscrive for every handler declared
  Object.keys(HANDLERS).forEach(handler => {
    sub.subscribe(handler)
  })

  // return pub sub
  return {
    pub: pub,
    sub: sub,
    cache: new Cacheman(app.config.CACHE_NAME, {
      engine: 'redis',
      url: app.config.REDIS_URL
    })
  }
}