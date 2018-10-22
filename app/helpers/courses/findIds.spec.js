const _ = require('lodash')
const app = require('@/app')
const assert = require('assert')
const populate = require('@/populate')

const func = require('./findIds')

describe('helpers.courses.findIds', function () {
  let models
  let pick = ['disciplina', 'ideal_quad', 'turma', 'campus', 'turno']

  xit('return a list of all disciplines and ids for a seson', async function () {
    let resp = await func('Bacharelado em Ciências da Computação')
  })
})