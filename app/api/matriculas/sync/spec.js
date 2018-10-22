const app = require('@/app')
const assert = require('assert')
const populate = require('@/populate')
const sinon = require('sinon')
const Axios = require('axios')
const _ = require('lodash')

const func = require('./func')
const rule = require('./rule')

describe('GET /v1/matriculas/sync', function() {
  var models, context
  
  beforeEach(async function () {
    models = await populate({ operation : 'both', only: ['disciplinas'] })

    context = {
      query: {},
      body: {},
    }
  })

  describe('func', function () {
    let stub
    
    beforeEach(async function () {
      let file = app.helpers.test.getMatriculas()
      file.data = app.helpers.test.sample(file.data, 100)
      stub = sinon.stub(Axios, 'get').returns(file)
    })

    afterEach(async function () {
      stub.restore()
    })

    it('sync disciplines', async function () {
      let resp = await func(context)

      // check if is scoped by season
      let Disciplinas = app.models.disciplinas.bySeason('2018:2')
      assert.equal(await Disciplinas.findOne({}), null)

      const season = app.helpers.season.findSeasonKey()
      Disciplinas = app.models.disciplinas.bySeason(season)
      let disciplina = await Disciplinas.findOne({ disciplina_id: 2000 })

      assert.equal(disciplina.disciplina_id, 2000)  
      assert(disciplina.alunos_matriculados.length)
      assert(!disciplina.before_kick.length)
      assert(!disciplina.after_kick.length)
    })

    it('update before_kick key', async function () {
      context.query.operation = 'before_kick'
      let resp = await func(context)

      // check if is scoped by season
      let Disciplinas = app.models.disciplinas.bySeason('2018:2')
      assert.equal(await Disciplinas.findOne({}), null)

      const season = app.helpers.season.findSeasonKey()
      Disciplinas = app.models.disciplinas.bySeason(season)
      let disciplina = await Disciplinas.findOne({ disciplina_id: 2000 })

      assert.equal(disciplina.disciplina_id, 2000)
      assert(!disciplina.alunos_matriculados.length)
      assert(disciplina.before_kick.length)
      assert(!disciplina.after_kick.length)  
    })

    it('update after_kick key', async function () {
      context.query.operation = 'after_kick'
      let resp = await func(context)

      // check if is scoped by season
      let Disciplinas = app.models.disciplinas.bySeason('2018:2')
      assert.equal(await Disciplinas.findOne({}), null)

      const season = app.helpers.season.findSeasonKey()
      Disciplinas = app.models.disciplinas.bySeason(season)
      let disciplina = await Disciplinas.findOne({ disciplina_id: 2000 })

      assert.equal(disciplina.disciplina_id, 2000)
      assert(!disciplina.alunos_matriculados.length)
      assert(!disciplina.before_kick.length)
      assert(disciplina.after_kick.length)  
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