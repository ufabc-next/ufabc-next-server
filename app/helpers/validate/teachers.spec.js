const assert = require('assert')

const teachers = require('./teachers')

describe('teachers', function () {
  it('should return empty list when has not errors', function () {
    const disciplinas = [
        {
            teoria: {
                name: 'Vanessa Kruth',
                error: null,
            },
            pratica: {
                name: 'Vanessa Kruth',
                error: null,
            }
        },
        {
            teoria: {
                name: 'Isidro',
                error: null,
            },
            pratica: {
                name: 'Isidro',
                error: null,
            }
        },
    ];

    assert.equal(0, Array.from(teachers(disciplinas)).length)
  })

  it('should return list with one error', function () {
    const disciplinas = [
        {
            teoria: {
                name: 'Vanessa Kruth',
                error: null,
            },
            pratica: {
                name: 'Vanessa Kruth',
                error: null,
            }
        },
        {
            teoria: {
                name: 'Isidro',
                error: 'Sala não encontrada',
            },
            pratica: {
                name: 'Isidro',
                error: null,
            }
        },
    ];

    assert.equal(1, Array.from(teachers(disciplinas)).length)
  })
})
