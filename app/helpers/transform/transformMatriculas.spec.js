const assert = require('assert')
const transformMatriculas = require('./transformMatriculas.js')

describe('helpers.transform.transformMatriculas ', function() {

  it('Should concat student id in class', function () {
    const disciplinas = {
      '11066615': ['Funções de Uma Variável', 'Processamento da Informação', 
        'Engenharia de Software', 'Física Quântica'],
      '11075416': ['Funções de Uma Variável', 'Processamento da Informação',
        'Laboratório de Engenharia de Software', 'Fenônomenos Eletromagnéticos'],
      '11000114': ['Funções de Uma Variável', 'Materiais e Suas Propriedades', 
        'Teoria dos Grafos']}

    const matriculas = transformMatriculas(disciplinas)

    assert.equal(matriculas['Funções de Uma Variável'].length, 3)
    assert.equal(matriculas['Processamento da Informação'].length, 2)
    assert.equal(matriculas['Laboratório de Engenharia de Software'].length, 1)
  })
})