const app = require('@/app')
const assert = require('assert')
const populate = require('@/populate')
const sinon = require('sinon')
const Axios = require('axios')
const _ = require('lodash')

const func = require('./func')
const rule = require('./rule')

describe('GET /v1/disciplinas/sync', function() {
  var models, context
  
  beforeEach(async function () {
    models = await populate({ operation : 'both', only: ['disciplinas'] })

    context = {
      query: {},
      body: {},
    }
  })

  describe('func', function () {
    it('sync disciplines', async function () {
      let file = app.helpers.test.getDisciplinas()
      file.data = app.helpers.test.sample(file.data, 200)
      let stub = sinon.stub(Axios, 'get').returns(file)

      let resp = await func()

      // check if is scoped by season
      let Disciplinas = app.models.disciplinas.bySeason('2018:2')
      assert.equal(await Disciplinas.findOne({}), null)

      const season = app.helpers.season.findSeasonKey()
      Disciplinas = app.models.disciplinas.bySeason(season)

      assert.equal(await Disciplinas.countDocuments({}), 200)
      let disciplina = await Disciplinas.findOne({ disciplina_id : 2538 }).lean(true)
      assert.equal(disciplina.disciplina_id, 2538)

      stub.restore()
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