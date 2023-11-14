const app = require('@/app')
const func = require('./func')
const assert = require('assert')
const populate = require('@/populate')

describe.skip('POST /v1/comments', async function () {
  let models
  let context
  let enrollment
  beforeEach(async function () {
    models = await populate({
      operation: 'both',
      only: ['enrollments', 'teachers', 'subjects', 'comments'],
    })

    enrollment = models.enrollments[0]
    context = {
      body: {
        enrollment: enrollment._id,
        comment: 'Some comment',
        type: 'pratica',
      },
    }
  })
  describe.skip('func', async function () {
    describe('with valid params', async function () {
      it('create and return a filtered comment', async function () {
        const resp = await func(context)

        assert(resp._id)
        assert.equal(resp.comment, context.body.comment)
        assert(resp.createdAt)
        assert(new Date() > resp.createdAt)
        assert.equal(resp.enrollment._id, context.body.enrollment)
        assert.equal(resp.subject, enrollment.subject)
        assert.equal(resp.teacher, enrollment.mainTeacher)
        assert.notEqual(resp.ra, enrollment.ra)

        const Comment = app.models.comments
        const comment = await Comment.findOne({ _id: resp._id })
        assert(comment)
      })
    })
    describe('with invalid params', async function () {
      it('should throw if enrollment is missing', async function () {
        delete context.body.enrollment
        await assertFuncThrows('MissingParameter', func, context)
      })
      it('should throw if comment is missing', async function () {
        delete context.body.comment
        await assertFuncThrows('MissingParameter', func, context)
      })
      it('should throw if type is missing', async function () {
        delete context.body.type
        await assertFuncThrows('MissingParameter', func, context)
      })
      it('should throw if enrollment is invalid', async function () {
        // Invalid enrollment id
        context.body.enrollment = models.comments[0]._id
        await assertFuncThrows('BadRequest', func, context)
      })
      it('should throw if is a duplicated comment', async function () {
        await func(context)
        await assertFuncThrows('BadRequest', func, context)
      })
    })
  })
})
