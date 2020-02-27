const assert = require('assert')
const func = require('./paginate')

describe('helpers.rest.paginate', function() {
  it('apply defaults on limit and page', function () {
    let context = {
      erm: { query: {} },
      query: {}
    }

    func(context, null, () => {} )
    assert.equal(context.erm.query.limit, 10)
    assert.equal(context.erm.query.skip, 0)
    assert.equal(context.query.limit, 10)
    assert.equal(context.query.page, 1)
  })

  it('corrects problem', function () {
    let context = {
      erm: { query: {} },
      query: {
        page: 'dois'
      }
    }

    func(context, null, () => {} )
    assert.equal(context.erm.query.limit, 10)
    assert.equal(context.erm.query.skip, 0)
    assert.equal(context.query.limit, 10)
    assert.equal(context.query.page, 1)
  })

  it('paginates according to page and limit passed', function () {
    let context = {
      erm: { query: { limit: 5 } },
      query: {
        page: '10',
      }
    }

    func(context, null, () => {} )
    
    assert.equal(context.erm.query.limit, 5)
    assert.equal(context.erm.query.skip, 45)
    assert.equal(context.query.limit, 5)
    assert.equal(context.query.page, 10)
  })
})