const errors = require('@/errors')

module.exports = async (context) => {
  let permissions = context.user.permissions

  if (permissions.includes('user:write')) {
    return
  }
  
  throw new errors.Forbidden.MissingPermission('user:write')
}