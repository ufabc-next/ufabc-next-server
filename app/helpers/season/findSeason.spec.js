const assert = require('assert')
const func = require('./findSeason')

describe('HELPERS findSeason', function() {
  it('works on the end of year', async function () {
    let resp = await func(new Date('2018-12-12'))
    assert.equal(resp.quad, 1)
    assert.equal(resp.year, 2019)
  })

  it('works on start of year', async function () {
    let resp = await func(new Date('2019-02-12'))
    assert.equal(resp.quad, 1)
    assert.equal(resp.year, 2019)
  })

  it('works on 2nd quad', async function () {
    let resp = await func(new Date('2018-04-12'))
    assert.equal(resp.quad, 2)
    assert.equal(resp.year, 2018)
  })

  it('works on 3rd quad', async function () {
    let resp = await func(new Date('2018-08-12'))
    assert.equal(resp.quad, 3)
    assert.equal(resp.year, 2018)
  })
})