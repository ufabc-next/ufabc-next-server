const _ = require('lodash')
const app = require('@/app')
const removeDiatrics = require('./removeDiacritics')

// This convert an disciplina from the .json from matriculas.ufabc
module.exports = function convertDisciplina(d) {
  const obj = _.defaults(_.clone(d))

  // specific for .json
  delete obj.campus
  delete obj.turno
  obj.obrigatorias = _.map(obj.obrigatoriedades, 'curso_id')

  let afterNoon = false

  // handler horarios based on pdf or json
  if(obj.horarios && _.isObject(obj.horarios)) {
    let startHours = _.get(obj.horarios, '[0].horas', [])
    afterNoon = ['14:00', '15:00', '16:00', '17:00'].some(hour => startHours.includes(hour))
  } else if(obj.horarios && _.isString(obj.horarios)) {
    obj.horarios = removeLineBreaks(obj.horarios)

    const matched = obj.horarios.match(/\d{2}:\d{2}/g)
    
    // only match if is even
    if(matched.length % 2 == 0) {
      let hours = _.chunk(matched, 2)
      hours.forEach(m => {
        let [start] = m.map(h => parseInt(h.split(':')[0]))
        
        if(start >= 12 && start < 18) {
          afterNoon = true
        }
      })
    }
  }

  // trabalha nas disciplinas
  if(!obj.nome) return obj

  let turnoIndex = null

  let breakRule = '-'

  var splitted = removeLineBreaks(obj.nome).split(breakRule)
  if(splitted.length == 1) {
    breakRule = ' '
    splitted = splitted[0].split(/\s+/)
  }

  splitted.map(function(item, i) {
    obj.campus = obj.campus || extractCampus(item)
    obj.turno = obj.turno || extractTurno(item)

    if((obj.turno || obj.campus) && turnoIndex == null) turnoIndex = i
  })

  if(afterNoon && !obj.turno) {
    obj.turno = 'tarde'
  }

  if(!obj.campus) {
    let secondPath = splitted.slice(turnoIndex + 1, splitted.length)
    obj.campus = extractCampus(secondPath.join(breakRule))
  }

  // cut until the index we found
  splitted = splitted.slice(0, turnoIndex)

  // separa a turma da disciplina
  var disciplina = _.compact(splitted.join('-').split(/\s+/))
  obj.turma = disciplina[disciplina.length -1]
  disciplina.pop()

  // fix disciplina
  const rawDisciplina = disciplina.join(' ').trim()
  obj.disciplina = toTitleCase(rawDisciplina)

  obj.disciplina_id = obj.id
  if(obj.codigo != null) {
    obj.ideal_quad = app.helpers.season.findIdeais().includes(obj.codigo)
  }
  
  if(obj.teoria == '0' || obj.teoria == '') obj.teoria = null
  if(obj.pratica == '0' || obj.pratica == '') obj.pratica = null

  if(obj.teoria != null) obj.teoria = cleanTeacher(removeLineBreaks(obj.teoria))
  if(obj.pratica != null) obj.pratica = cleanTeacher(removeLineBreaks(obj.pratica))

  return obj  
}

function cleanTeacher(str){
  return _.startCase(_.camelCase(str))
    .replace(/-+.*?-+/g, '')
    .replace(/\(+.*?\)+/g, '')
}

function removeLineBreaks(str) {
  return str.replace(/\r?\n|\r/g, ' ')
}

function extractTurno(d){
  const min = d.toLowerCase()
  if(min.includes('diurno') || min.includes('matutino')) {
    return 'diurno'
  }

  if(min.includes('noturno')) {
    return 'noturno'
  }

  return null
}

function extractCampus(d) {
  const min = removeDiatrics(d.toLowerCase())
  if(/.*santo\s+andre.*/.test(min)) {
    return 'santo andre'
  }

  if(/.*sao\s+bernardo.*/.test(min)) {
    return 'sao bernardo'
  }

  return null
}


function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
  );
}
