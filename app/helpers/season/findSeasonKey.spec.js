const assert = require('assert')
const func = require('./findSeasonKey')

describe('HELPERS findSeasonKey', function() {
  it('works on the end of year', async function () {
    let resp = await func(new Date('2018-12-12'))
    assert.equal(resp, '2019:1')
  })

  it('works on start of year', async function () {
    let resp = await func(new Date('2019-02-12'))
    assert.equal(resp, '2019:1')
  })

  it('works on 2nd quad', async function () {
    let resp = await func(new Date('2018-04-12'))
    assert.equal(resp, '2018:2')
  })

  it('works on 3rd quad', async function () {
    let resp = await func(new Date('2018-08-12'))
    assert.equal(resp, '2018:3')
  })
})