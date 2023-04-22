const assert = require('assert')

const toNumber = require('./toNumber')

describe('toNumber', function () {
  describe('when value already is number', function () {
    it('should return miliseconds duration', function () {
      const number = 3
      assert.equal(number, toNumber(number))
    })
  })

  describe('when the value is not a number', function () {
    it('should parse simple value correctly', function () {
      assert.equal(1, toNumber('1'))
      assert.equal(28, toNumber('28'))
      assert.equal(742, toNumber('742'))
      assert.equal(1000, toNumber('1000'))
    })

    it('should parse comma value correctly', function () {
      assert.equal(1000, toNumber('1000,00'))
      assert.equal(6213.99, toNumber('6213,99'))
    })

    it('should parse point value correctly', function () {
      assert.equal(10, toNumber('10.00'))
      assert.equal(767.35, toNumber('767.35'))
    })
  })
}) 