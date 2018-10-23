const app = require('@/app')
const assert = require('assert')
const populate = require('@/populate')
const sinon = require('sinon')
const Axios = require('axios')
const _ = require('lodash')
const path = require('path')
const fs = require('fs')

const func = require('./func')
const rule = require('./rule')
const sync = require('@/api/disciplinas/sync/func')

describe('GET /v1/disciplinas/:disciplina-id/kicks', function() {
  var models, context, disciplina

  const season = app.helpers.season.findSeasonKey()
  const Disciplinas = app.models.disciplinas.bySeason(season)
  
  beforeEach(async function () {
    models = await populate({ operation : 'both', only: ['disciplinas', 'alunos'] })
    context = {
      query: {},
      params: {}
    }
  })

  describe('func', function () {
    it('returns a complete list of disciplinas', async function () {
      let disciplina = await Disciplinas.create({
        disciplina_id: 100,
        alunos_matriculados: [12263],
        turno: 'diurno',
        before_kick: [10523, 1504],
        obrigatorias: [6, 20],
        after_kick: [1504]
      })

      context.params.disciplinaId = disciplina.disciplina_id
      let resp = await func(context)
     
      assert.equal(resp.length, 2)
      assert(resp.every(s => 'kicked' in s))
    })

    it('allows custom query method', async function () {
      context.query.sort = ['cr', 'cp']

      let disciplina = await Disciplinas.create({
        disciplina_id: 100,
        alunos_matriculados: [12263, 10523],
        turno: 'noturno',
        obrigatorias: [6, 20],
      })
      
      context.params.disciplinaId = disciplina.disciplina_id
      let resp = await func(context)
     
      assert.equal(resp.length, 2)
      assert(resp.every(s => !('kicked' in s)))
    })
  })

  describe('rule', function () {
    it('throws if aluno_id is not passed', async function () {
      await assertFuncThrows('Forbidden', rule, context)
    })

    it('throws if aluno_id is not on database', async function () {
      context.query.aluno_id = 1
      await assertFuncThrows('Forbidden', rule, context)
    })

    it('throws if aluno_id is not on database', async function () {
      context.query.aluno_id = 12263
      await rule(context)
    })
  })
})