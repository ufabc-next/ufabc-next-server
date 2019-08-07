const app = require('@/app')
const errors = require('@/errors')

module.exports = async function(context){
  const Simulation = app.models.simulation
  const { user } = context

  if (!user) {
    throw new errors.BadRequest(`Não está logado.`)
  }

  const simulation = await Simulation.findOne({ user: user._id })
  return simulation
}