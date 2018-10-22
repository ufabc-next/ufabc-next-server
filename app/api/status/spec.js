const assert = require('assert')
const func = require('./func')

describe('GET /v1/status', function() {
  it('give back status', async function () {
    let resp = await func({})
    assert.equal(resp.status, 'alive')
  })
})