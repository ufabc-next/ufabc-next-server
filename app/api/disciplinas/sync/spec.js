const app = require('@/app')
const assert = require('assert')
const populate = require('@/populate')
const sinon = require('sinon')
const Axios = require('axios')

const func = require('./func')

describe('POST /v1/disciplinas/sync', function() {
  beforeEach(async function () {
    await populate({ operation : 'both', only: ['disciplinas'] })
  })

  describe('func', function () {
    xit('sync disciplines', async function () {
      let file = app.helpers.test.getDisciplinas()
      file.data = app.helpers.test.sample(file.data, 200)
      let stub = sinon.stub(Axios, 'get').returns(file)

      await func()

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
})