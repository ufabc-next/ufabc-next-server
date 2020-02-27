const assert = require('assert')
const populate = require('@/populate')

const func = require('./findId')

describe('helpers.courses.findId', function () {
  beforeEach(async function () {
    await populate({ operation: 'both', only: ['alunos'] })
  })

  it('return the id of a course for a season', async function () {
    let resp = await func('Bacharlado em Ciências da Compuação')
    assert.equal(resp, 17)

    resp = await func('Bacharlado em Ciênci e tecnolo')
    assert.equal(resp, 20)
  })
})