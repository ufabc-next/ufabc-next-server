const assert = require('assert')
const resolveProfessor = require('./resolveProfessor.js')

describe.only('helpers.transform.resolveProfessor', function() {

  it('Should return Missing Teacher error', function () {
    const professor = {'name': 'Paulo Meirelles'}
    const profProcurado = {'name': 'Joaquin Melo'}

    assert.throws(function() {
      resolveProfessor(profProcurado, professor, {})
    })
  })

  it('Should return null', function () {
    const nullVariable = resolveProfessor('Falso', null, {})
    assert.equal(nullVariable, null)
  })

  it('Should return a professor ', function () {
    const professores = [
      {name: 'Paulo Meirelles'}, {name: 'Joaquin Melo'},
      {name: 'Fabio Carneiro'}, {name: 'Andre Rodrigues'},
      {name: 'Igor Mourão'}, {name: 'Bruno Cruz'}] 

    const profProcurado = 'Joaquin Melo'

    const profRetornado = resolveProfessor(profProcurado, professores, {})

    assert.equal(profRetornado.name, 'Joaquin Melo')
  })

})