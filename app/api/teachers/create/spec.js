const app = require('@/app')
const assert = require('assert')
const func = require('./func')

const populate = require('@/populate')
const teacherList = require('@/api/teachers/list/func')

describe('POST /v1/private/teachers', function() {
  let context, models

  beforeEach(async function () {
    models = await populate({ operation : 'remove', only: ['teachers'] })
    context = {
      query: {},
      body: {
        name: 'Some new teacher'
      }
    }
  })

  it('creates a new teachers', async function () {
    const beforeTeachers = await teacherList()
    assert.equal(beforeTeachers.length, 0)

    const resp = await func(context)

    // wait to cache to be cleaned
    await app.helpers.sleep(50)

    const afterTeachers = await teacherList()
    assert.equal(afterTeachers.length, 1)
  })
})