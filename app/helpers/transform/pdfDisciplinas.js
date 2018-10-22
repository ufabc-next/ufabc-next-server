const _ = require('lodash')
const app = require('@/app')
const errors = require('@/errors')

module.exports = function parsePdfData(payload, mappings) {
  if(!mappings) {
    mappings = [
      'codigo',
      'nome',
      'horarios',
      'teoria',
      'pratica'
    ]
  }

  // group by region
  const columns = _(payload)
    .map(s => _.extend(s, { pos: parseInt((s.top + s.left) / 10) }))
    .groupBy((i) => i.pos)
    .value()

  const result = []

  if(Object.keys(columns).length != mappings.length) {
    throw new errors.BadRequest('Mapping does not reflect PDF structure')
  }

  var pagesLenghts = []

  Object.keys(columns).forEach((key, index) => {
    let propertyName = mappings.shift()
    let propertyColumn = columns[key]
    // keep track of array position, for
    let pageNumber = 0
    let pageLenght = null
    let pagePositions = {}

    propertyColumn.forEach((page, i) => {
      if(!Object.keys(pagePositions).length) {
        page.data.forEach((r, j) => {
          pagePositions[`${i}_${resolvePosition(r[0].top)}`] = j * (i + 1)
        })
      }

      if(i == 0) {
        pagesLenghts.push(page.data.length)
      }

      page.data.forEach(row => {
        const prop =  { [propertyName]: _.map(row, 'text').join(' ') }
        if(pagePositions[resolvePosition(row[0].top)] == null) return
        var pos = pagePositions[`${i}_${resolvePosition(row[0].top)}`]
        result[pos] = result[pos] ? _.extend(result[pos], prop) : prop
      })
    })
  
    console.log(pagePositions)
  })


  return result.map(app.helpers.transform.disciplinas).filter(r => {
    return r.codigo && r.turma && r.campus && r.turno
  })
}

function resolvePosition (top) {
  return parseInt((top) / 10)
}