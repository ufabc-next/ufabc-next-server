const app = require('@/app')
const assert = require('assert')
const populate = require('@/populate')
const sinon = require('sinon')
const Axios = require('axios')
const _ = require('lodash')
const path = require('path')
const fs = require('fs')

const func = require('./func')
const sync = require('@/api/disciplinas/sync/func')

describe('GET /v1/disciplinas', function() {
  var models, context, pdfData
  
  beforeEach(async function () {
    models = await populate({ operation: 'both', only: ['disciplinas', 'subjects'] })

    context = {
      query: {},
    }
  })

  describe('func', function () {
    beforeEach(async function () {
      let file = app.helpers.test.getDisciplinas()
      file.data = app.helpers.test.sample(file.data, 100)
      let stub = sinon.stub(Axios, 'get').returns(file)
      await sync()
      stub.restore()
    })

    it('returns a complete list of disciplinas', async function () {
      let resp = await func()
      assert.equal(resp.length, 100)
    })
  })
})