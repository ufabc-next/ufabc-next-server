const assert = require('assert')
const findIdeais = require('./findIdeais')

describe('helpers.season.findIdeais', function() {

    it('Should return first quad courses', function () {
        const expectedCourses = [
            'BCM0506-15', // COMUNICACAO E REDES
            'BCJ0203-15', // ELETROMAG 
            'BIN0406-15', // IPE
            'BCN0405-15', // IEDO
            'BIR0004-15', // EPISTEMOLOGICAS
            'BHO0102-15', // DESENVOL. E SUSTE.
            'BHO0002-15', // PENSA. ECONOMICO
            'BHP0201-15', // TEMAS E PROBLEMAS
            'BHO0101-15', // ESTADO E RELA
            'BIR0603-15', // CTS
            'BHQ0003-15', // INTEPRE. BRASIL
            'BHQ0001-15', // IDENT.E CULTURA
          ]
        const date = new Date("2021-04-01")
        const func = findIdeais(date)  

        expectedCourses.forEach(function (course, index) {
            assert.equal(course, expectedCourses[index])
        })
    })

    it('Should return second quad courses', function () {
        const expectedCourses = [
            'BCM0504-15', // NI
            'BCN0404-15', // GA
            'BCN0402-15', // FUV
            'BCJ0204-15', // FEMEC
            'BCL0306-15', // BIODIVERSIDADE
            'BCK0103-15', // QUANTICA
            'BCL0308-15', // BIOQUIMICA
            'BIQ0602-15', // EDS
            'BHO1335-15', // FORMACAO SISTEMA INTERNACIONAL
            'BHO1101-15', // INTRODUCAO A ECONOMIA
            'BHO0001-15', // INTRODUCAO AS HUMANIDADES
            'BHP0202-15', // PENSAMENTO CRITICO
          ]
        const date = new Date("2021-07-01")
        const func = findIdeais(date)  

        expectedCourses.forEach(function (course, index) {
            assert.equal(course, expectedCourses[index])
        })
    })

    it('Should return third quad courses', function () {
        const expectedCourses = [
            'BCJ0205-15', // FETERM
            'BCM0505-15', // PI
            'BCN0407-15', // FVV
            'BCL0307-15', // TQ
            'BCK0104-15', // IAM
            'BIR0603-15', // CTS
            'BHP0001-15', // ETICA E JUSTICA
            'BHQ0301-15', // TERRITORIO E SOCIEDADE
            // ESTUDO ÉTNICOS RACIAIS
          ]
          const date = new Date("2021-11-21")
          const func = findIdeais(date)

          expectedCourses.forEach(function (course, index) {
            assert.equal(course, expectedCourses[index])
        })
    })
})