const redis = require('redis')
const bluebird = require('bluebird')
const Cacheman = require('cacheman')
const requireSmart = require('require-smart')
const Raven = require('raven')
const url = require('url')

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
      Raven.captureException(e)
    }
  })

  // subscrive for every handler declared
  Object.keys(HANDLERS).forEach(handler => {
    sub.subscribe(handler)
  })

  const parsedRedis = url.parse(app.config.REDIS_URL, false, true)

  // return pub sub
  return {
    publish(handler, payload) {
      pub.publish(handler, JSON.stringify(payload))
    },
    sub: sub,
    cache: new Cacheman(app.config.CACHE_NAME, {
      engine: 'redis',
      port: parsedRedis.port,
      host: parsedRedis.hostname
    })
  }
}