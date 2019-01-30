const app = require('@/app')
const errors = require('@/errors')

module.exports = async function (context) {
  const { identifier } = context.params

  if(!identifier) {
    return
  }

  const keys = ['ra', 'year', 'quad', 'disciplina']
  const matchIdentifier = app.helpers.transform.identifier(context.body, keys)

  if(identifier != matchIdentifier) {
    throw new errors.Forbidden('enrollment')
  }

  // TODO
}

  