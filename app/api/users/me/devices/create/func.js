const errors = require('@/errors')

const _ = require('lodash')
const useragent = require('useragent')

module.exports = async function(context) {
  const { user } = context
  const { device } = context.body

  if(!device) {
    throw new errors.BadRequest.MissingParameter('device')
  }

  if(!device.id) {
    throw new errors.BadRequest.MissingParameter('device.id')
  }

  if(!device.token) {
    throw new errors.BadRequest.MissingParameter('device.token')
  }

  if (!user) {
    throw new errors.NotFound('Usuário não encontrado')
  }

  const agent = useragent.parse(_.get(context, 'headers.user-agent', ''))

  const newDevice = {
    id: device.id,
    token: device.token,
    phone: agent.device.toString()
  }

  user.addDevice(newDevice)

  await user.save()

  return user.devices
}