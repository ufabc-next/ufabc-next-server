const app = require('@/app')
const populate = require('@/populate')

const func = require('./func')
const rule = require('./rule')

describe('POST /v1/enrollments', function() {
  var context, enrollments
  
  beforeEach(async function () {
    enrollments = JSON.parse(app.helpers.test.getFixture('enrollments.json').data)

    context = {
      query: {},
      body: {
        season: '2018:1',
        enrollments,
        subjectMappings: {
          'Introdução aos Processos de' : 'Introdução aos Processos de Fabricação Metal - Mecânico'
        }
      },
    }
  })

  describe('func', function () {

    beforeEach(async function () {
      await populate({ operation : 'both', only: ['teachers', 'subjects', 'enrollments'] })
    })

    xit('create enrollments', async function () {
      let resp = await func(context)

      context.body.hash = resp.hash

      resp = await func(context)

      //await populate({ operation: 'both', only: ['histories']})

      // let file = app.helpers.test.getDisciplinas()
      // file.data = app.helpers.test.sample(file.data, 200)
      // let stub = sinon.stub(Axios, 'get').returns(file)

      // let resp = await func()

      // // check if is scoped by season
      // let Disciplinas = app.models.disciplinas.bySeason('2018:2')
      // assert.equal(await Disciplinas.findOne({}), null)

      // const season = app.helpers.season.findSeasonKey()
      // Disciplinas = app.models.disciplinas.bySeason(season)

      // assert.equal(await Disciplinas.countDocuments({}), 200)
      // let disciplina = await Disciplinas.findOne({ disciplina_id : 2538 }).lean(true)
      // assert.equal(disciplina.disciplina_id, 2538)

      // stub.restore()
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