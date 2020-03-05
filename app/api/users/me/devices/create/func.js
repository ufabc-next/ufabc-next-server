const errors = require('@/errors')

const _ = require('lodash')
const useragent = require('useragent')

module.exports = async function(context) {
  const { user } = context
  const { deviceId, token } = context.body

  if(!deviceId) {
    throw new errors.BadRequest.MissingParameter('deviceId')
  }

  if(!token) {
    throw new errors.BadRequest.MissingParameter('token')
  }

  if (!user) {
    throw new errors.NotFound('Usuário não encontrado')
  }

  const agent = useragent.parse(_.get(context, 'headers.user-agent', ''))

  const newDevice = {
    deviceId,
    token,
    phone: agent.device.toString()
  }

  user.addDevice(newDevice)

  await user.save()

  return user.devices
}
