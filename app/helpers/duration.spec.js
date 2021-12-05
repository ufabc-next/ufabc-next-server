const assert = require('assert')

const duration = require('./duration')

describe('duration', function () {
  it('should return miliseconds duration', function () {
    const miliSecondsDuration = 999
    assert.equal(miliSecondsDuration + ' ms', duration(miliSecondsDuration))
  })

  it('should return seconds duration', function () {
    const secondsDuration = 59000
    assert.equal('59 s', duration(secondsDuration))
  })

  it('should return minutes duration', function () {
    const minutesDuration = 180000
    assert.equal('3 min', duration(minutesDuration))
  })
})