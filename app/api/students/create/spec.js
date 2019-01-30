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

describe('POST /v1/students', function() {
  let context, disciplina, models

  const season = app.helpers.season.findSeasonKey()
  
  beforeEach(async function () {
    models = await populate({ operation : 'both', only: ['disciplinas', 'subjects', 'alunos'] })

    context = {
      query: {},
      body: {
        aluno_id: 3000,
        cursos: [{
          cr: 2,
          cp: 0.5,
          quads: 3,
          curso: 'Bacharelado em Ciência e Tecnologia'
        }, {
          cr: 2,
          cp: 0.6,
          quads: 3,
          curso: 'Bacharelado e Ciências da Computação'
        }]
      }
    }

    let file = app.helpers.test.getDisciplinas()
    file.data = app.helpers.test.sample(file.data, 1)
    let stub = sinon.stub(Axios, 'get').returns(file)
    await sync()
    stub.restore()
  })

  describe('func', function () {
    it('returns a complete list of disciplinas', async function () {
      let resp = await func(context)
     
      assert.equal(resp.aluno_id, context.body.aluno_id)
      assert.equal(resp.season, season)
    })

    it('returns if kicks are already in place', async function () {
      const disciplina = await app.models.disciplinas.findOne({})
      disciplina.before_kick = [1,2,3]
      await disciplina.save()

      let resp = await func(context)
      assert(!resp)
    })

    it('throws if missing aluno_id', async function () {
      delete context.body.aluno_id
      await assertFuncThrows('MissingParameter', func, context)
    })
  })
})