const _ = require('lodash')
const app = require('@/app')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

const func = require('./pdfDisciplinas')

describe('helpers.transform.pdfDisciplinas', function () {
  let sample
  let pick = ['codigo', 'disciplina', 'turma', 'campus', 'turno']

  
  beforeEach(function () {
  })

  it('test if parses everything correctly')
})