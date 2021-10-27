const assert = require('assert')

const func = require('./coefficients')

describe('helpers.calculate.coefficients', function () {
  describe('isAprovado', function () {
    it('should return true when student is approved', function () {
      assert.equal(true, func.isAprovado('A'))
      assert.equal(true, func.isAprovado('B'))
      assert.equal(true, func.isAprovado('C'))
      assert.equal(true, func.isAprovado('D'))
    })

    it('should return false when student is not approved', function () {
      assert.equal(false, func.isAprovado('F'))
      assert.equal(false, func.isAprovado('O'))
      assert.equal(false, func.isAprovado('I'))
    })
  })

  describe('parseCategory', function () {
    it('should return correct category', function () {
      assert.equal('free', func.parseCategory('Livre Escolha'))
      assert.equal('mandatory', func.parseCategory('Obrigatória'))
      assert.equal('limited', func.parseCategory('Opção Limitada'))
      assert.equal(null, func.parseCategory('invalid category'))
    })
  })

  describe('convertGradeToNumber', function () {
    it('should return correct number', function () {
      assert.equal(4, func.convertGradeToNumber('A'))
      assert.equal(1, func.convertGradeToNumber('D'))
      assert.equal(0, func.convertGradeToNumber('F'))
      assert.equal(0, func.convertGradeToNumber('O'))
      assert.equal(-1, func.convertGradeToNumber('E'))
      assert.equal(-1, func.convertGradeToNumber('I'))
    })
  })

  describe('calculateAlunoCoefficientsData', function () {
    it('should return correct cp accumulated', function () {
      const result = func.calculateAlunoCoefficientsData(mockedDisciplines, mockedGraduation)
      assert.equal(0.089, result['2020'][3].cp_acumulado)
      assert.equal(0.211, result['2021'][1].cp_acumulado)
    })
  })
})

const mockedDisciplines = [{
  ano: 2020,
  periodo: 3,
  creditos: 3,
  categoria: 'Obrigatória'
},
{
  ano: 2020,
  periodo: 3,
  creditos: 5,
  categoria: 'Livre Escolha'
},
{
  ano: 2020,
  periodo: 3,
  creditos: 5,
  categoria: 'Obrigatória'
},
{
  ano: 2020,
  periodo: 3,
  creditos: 4,
  categoria: 'Opção Limitada'
},
{
  ano: 2021,
  periodo: 1,
  creditos: 5,
  categoria: 'Obrigatória'
},
{
  ano: 2021,
  periodo: 1,
  creditos: 3,
  categoria: 'Opção Limitada'
},
{
  ano: 2021,
  periodo: 1,
  creditos: 5,
  categoria: 'Obrigatória'
},
{
  ano: 2021,
  periodo: 1,
  creditos: 2,
  categoria: 'Opção Limitada'
},
{
  ano: 2021,
  periodo: 1,
  creditos: 3,
  categoria: 'Livre Escolha'
},
{
  ano: 2021,
  periodo: 1,
  creditos: 5,
  categoria: 'Opção Limitada'
},
]

const mockedGraduation = {
  credits_total: 190,
  limited_credits_number: 70,
  free_credits_number: 30,
  mandatory_credits_number: 90
}