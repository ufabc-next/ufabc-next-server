// const app = require('@/app')
// const Axios = require('axios')
// const sinon = require('sinon')
// const assert = require('assert')
// const populate = require('@/populate')

// const send = require('./send')

// describe('HELPER mailer/send', async function(){
//   let stub

//   beforeEach(async function () {
//     await populate({ operation: 'both' })
//     stub = sinon.stub(Axios, 'post')
//   })

//   afterEach(async function () {
//     stub.restore()
//   })

//   it('send a email to a single recipient', async function(){
//     const email = {
//       recipient: 'email@test.com',
//       body: {
//         name: 'My name'
//       }
//     }

//     const sender = { name: 'test', email: 'sender@email.com' }

//     await send(email, sender, 'templateId')
//     assert.equal(stub.callCount, 1)
//     assert.equal(stub.firstCall.args[0], 'https://api.sendgrid.com/v3/mail/send')
//     const params = stub.firstCall.args[1]
//     assert.equal(params.personalizations.length, 1)
//     assert.equal(params.from.name, sender.name)
//     assert.equal(params.from.email, app.config.mailer.EMAIL)
//     assert.equal(params.reply_to.email, sender.email)
//   })

//   it('send a email for multiple single recipient', async function(){
//     const email = [{
//       recipient: 'email@test.com',
//       body: { name: 'My name' }
//     }, { 
//       recipient: 'email2@test.com'
//     }]

//     await send(email, {}, 'templateId')
//     assert.equal(stub.callCount, 1)
//     assert.equal(stub.firstCall.args[0], 'https://api.sendgrid.com/v3/mail/send')
//     const params = stub.firstCall.args[1]
//     assert.equal(params.personalizations.length, 2)
//   })
// })