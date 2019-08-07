const app = require('@/app')
const errors = require('@/errors')

module.exports = async function(context){
  const Simulation = app.models.simulation
  const { user } = context

  if (!user) {
    throw new errors.BadRequest(`Não está logado.`)
  }

  let simulation = await Simulation.findOne({ user: user._id })
  if (simulation) {
    simulation.set({ season: context.body})
  } else {
    let data = {
      season: context.body,
      user: user._id
    }
    console.log(JSON.stringify(data))
    simulation = await Simulation.create(data)
  }

  return simulation
}