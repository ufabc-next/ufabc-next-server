const assert = require('assert')

const rule = require('./rule')

async function ruleAllowByContext(context) {
  if (!context.allow)
    throw 'Invalid'
}

async function ruleAllow() {
  return
}

async function ruleDeny() {
  throw 'Invalid credentials'
}

describe('helpers/routes.rule', function () {
  it('should proceed with callback', function(cb) {    
    let wrapped = rule(ruleAllow)

    wrapped({}, {}, (err) => {
      if (err !== undefined)
        return cb('Should receive undefined as error')

      cb()
    })
  })

  it('should not proceed with callback', function(cb) {    
    let wrapped = rule(ruleDeny)

    wrapped({}, {}, (err) => {
      if (err === undefined)
        return cb('Should receive one error')

      cb()
    })
  })

  it('should allow depending on context', function(cb) {    
    let wrapped = rule(ruleAllowByContext)

    wrapped({allow: false}, {}, (err) => {
      if (err === undefined)
        return cb('Should receive one error')

      cb()
    })
  })

  it('should deny depending on context', function(cb) {    
    let wrapped = rule(ruleAllowByContext)

    wrapped({allow: true}, {}, (err) => {
      if (err !== undefined)
        return cb('Should receive undefined as error')

      cb()
    })
  })
})