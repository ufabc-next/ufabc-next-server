const func = require('./func')
const assert = require('assert')

describe('GET /users/info', function() {
  describe('func', function() {
    describe('with valid params', function() {
      it('should return user public info', async function() {
        const user = {
          '_id': 'some id',
          'oauth': 'google',
          'confirmed': true,
          'email' : 'someemail@ufabc.next.com',
          'ra': 'some RA',
          'createdAt': new Date(),
          'devices': 'some device',
          'private' : 'should not return'
        }

        const context = {
          user
        }

        const response = await func(context)

        assert.equal(user._id, response._id)
        assert.equal(user.oauth, response.oauth)
        assert.equal(user.confirmed, response.confirmed)
        assert.equal(user.email, response.email)
        assert.equal(user.ra, response.ra)
        assert.equal(user.createdAt, response.createdAt)
        assert.equal(user.devices, response.devices)
        assert.notEqual(user.private, response.private)
                

      })
    })
    describe('with invalid params', function() {
      it('should throw an error when user is null', async function() {
        const context = {

        }
                
        await assertFuncThrows('NotFound', func, context)
            
      })
    })
  })
})
