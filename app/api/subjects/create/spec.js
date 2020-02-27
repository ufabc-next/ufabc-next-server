const app = require('@/app')
const assert = require('assert')
const func = require('./func')

const populate = require('@/populate')
const subjectsList = require('@/api/subjects/list/func')

describe('POST /v1/private/subjects', function() {
  let context

  beforeEach(async function () {
    await populate({ operation : 'remove', only: ['subjects'] })
    
    context = {
      query: {},
      body: {
        name: 'Some new subject'
      }
    }
  })

  it('creates a new subject', async function () {
    const beforeSubjects = await subjectsList()
    assert.equal(beforeSubjects.length, 0)

    await func(context)

    // wait to cache to be cleaned
    await app.helpers.sleep(50)

    const afterSubjects = await subjectsList()
    assert.equal(afterSubjects.length, 1)
  })
})