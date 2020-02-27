const app = require('@/app')
const assert = require('assert')
const populate = require('@/populate')
const sinon = require('sinon')
const Axios = require('axios')

const func = require('./func')
const rule = require('./rule')

const sync = require('@/api/disciplinas/sync/func')

describe('PUT /v1/disciplinas/teachers', function() {
  var context
  
  beforeEach(async function () {
    context = {
      query: {},
      body: {
        // disciplinas: pdfData
      },
    }
  })

  describe('func', function () {
    beforeEach(async function () {
      await populate({ operation : 'both' })

      let file = app.helpers.test.getDisciplinas()
      file.data = app.helpers.test.sample(file.data)
      let stub = sinon.stub(Axios, 'get').returns(file)
      await sync()
      stub.restore()
    })

    xit('sync disciplines teachers', async function () {
      let resp = await func(context)

      context.body.hash = resp.hash

      resp = await func(context)

      // check if is scoped by season
      let Disciplinas = app.models.disciplinas.bySeason('2018:2')
      assert.equal(await Disciplinas.findOne({}), null)

      const season = app.helpers.season.findSeasonKey()
      Disciplinas = app.models.disciplinas.bySeason(season)

      // assert.equal(await Disciplinas.countDocuments({}), 200)
      let disciplina = await Disciplinas.find({ teoria : { $ne: null } }).lean(true)
      assert.equal(disciplina.length,  2)
    })
  })

  describe('rule', function () {
    it('works if has permissions', async function () {
      context.query.access_key = app.config.ACCESS_KEY
      await rule(context)
    })

    it('throws if permission is wrong', async function () {
      context.query.access_key = 'wrong permissions'
      await assertFuncThrows('Forbidden', rule, context)
    })

    it('throws if permissions is missing', async function () {
      await assertFuncThrows('Forbidden', rule, context)
    })
  })
})