const _ = require('lodash')
const app = require('@/app')
const assert = require('assert')

const func = require('./disciplinas')

describe('helpers.transform.disciplinas', function () {
  let sample
  let pick = ['disciplina', 'ideal_quad', 'turma', 'campus', 'turno']

  beforeEach(function () {
    sample = app.helpers.test.getDisciplinas().data
    sample = app.helpers.parse.var2json(sample)
  })

  it('test if parses everything correctly', function () {
    let resp = sample.map(m => _.pick(func(m), pick))
    
    assert(resp.every(r => ['diurno', 'noturno', 'tarde'].includes(r.turno)))
    assert(resp.every(r => ['sao bernardo', 'santo andre' ].includes(r.campus)))
    assert(resp.every(r => r.turma.length > 0 && r.turma.length <= 3))
  })

  it('multiple parenthesis', function () {
    let resp = func({ nome: 'Aeronáutica I-A (quantas coisas e ---) A3   -    São Bernardo Noturno'})
    assert.equal(resp.disciplina, 'Aeronáutica I-A (quantas coisas e ---)')
    assert.equal(resp.turma, 'A3')
    assert.equal(resp.campus, 'sao bernardo')
    assert.equal(resp.turno, 'noturno')
  })

  it('who fails', function () {
    let resp = func({ nome: 'Dinâmica de Fluidos Computacional A-diurno (São Bernardo d\rCampo) - MINISTRADA EM INGLÊS' })
    assert.equal(resp.disciplina, 'Dinâmica de Fluidos Computacional')
  })

  xit('without -', function () {
    let resp = func({ nome: 'Introdução às Humanidades e Ciências Sociais A\rdiurno (São Bernardo do Campo)'})
    assert.equal(resp.disciplina, 'Introdução às Humanidades e Ciências Sociais')
    assert.equal(resp.turma, 'A')
    assert.equal(resp.campus, 'sao bernardo')
    assert.equal(resp.turno, 'diurno')
  })
})