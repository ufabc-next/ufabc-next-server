const assert = require('assert')

const coefficients = require('./coefficients')

describe('helpers.calculate.coefficients', function () {
  describe('isAprovado', function () {
    it('should return true when student is approved', function () {
      assert.equal(true, coefficients.isAprovado('A'))
      assert.equal(true, coefficients.isAprovado('B'))
      assert.equal(true, coefficients.isAprovado('C'))
      assert.equal(true, coefficients.isAprovado('D'))
    })

    it('should return false when student is not approved', function () {
      assert.equal(false, coefficients.isAprovado('F'))
      assert.equal(false, coefficients.isAprovado('O'))
      assert.equal(false, coefficients.isAprovado('I'))
    })
  })

  describe('parseCategory', function () {
    it('should return correct category', function () {
      assert.equal('free', coefficients.parseCategory('Livre Escolha'))
      assert.equal('mandatory', coefficients.parseCategory('Obrigatória'))
      assert.equal('limited', coefficients.parseCategory('Opção Limitada'))
      assert.equal(null, coefficients.parseCategory('invalid category'))
    })
  })

  describe('convertGradeToNumber', function () {
    it('should return correct number', function () {
      assert.equal(4, coefficients.convertGradeToNumber('A'))
      assert.equal(1, coefficients.convertGradeToNumber('D'))
      assert.equal(0, coefficients.convertGradeToNumber('F'))
      assert.equal(0, coefficients.convertGradeToNumber('O'))
      assert.equal(-1, coefficients.convertGradeToNumber('E'))
      assert.equal(-1, coefficients.convertGradeToNumber('I'))
    })
  })

  describe('calculateAlunoCoefficientsData', function () {
    it('should return correct cp accumulated', function () {
      const result = coefficients(mockedDisciplines, mockedGraduation)
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