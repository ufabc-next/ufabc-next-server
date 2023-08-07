const errors = require('@/errors')

module.exports = async function (context) {
  const { user } = context
  const { deviceId } = context.params

  if (!deviceId) {
    throw new errors.BadRequest.MissingParameter('deviceId')
  }

  if (!user) {
    throw new errors.NotFound('Usuário não encontrado')
  }

  const isValidDevice = user.devices.find(
    (device) => device.deviceId == deviceId
  )

  if (!isValidDevice) {
    throw new errors.BadRequest(`Invalid deviceId: ${deviceId}`)
  }
  const response = user.removeDevice(deviceId)

  await user.save()

  return response
}
