const assert = require('assert')

const slugify = require('./slugify')

describe('slugify', function () {
  it('should return slug correctly', function () {
    assert.equal('slug-teste', slugify('SLUG TESTE'))
    assert.equal('slug-teste', slugify(' SLUG         TESTE  '))
    assert.equal('slug-g-u-teste', slugify(' SLUG   [Ĝ]  [Ự]      TESTE  '))
  })
}) 