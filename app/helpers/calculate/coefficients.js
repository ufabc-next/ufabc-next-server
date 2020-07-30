// Calcules CA/CR for every given point of student history
// This is useful for discovering student CR/CA when he took a discipline
module.exports = function calculateAlunoCoefficientsData(disciplinas, graduation) {

  var hash_disciplinas = {}
  disciplinas.forEach(function (disciplina) {
    hash_disciplinas[disciplina.ano] = hash_disciplinas[disciplina.ano] || {}
    hash_disciplinas[disciplina.ano][disciplina.periodo] = hash_disciplinas[disciplina.ano][disciplina.periodo] || []
    hash_disciplinas[disciplina.ano][disciplina.periodo].push(disciplina)
  })

  var unique = {}
  var uniqueDisc = {}
  var executed_credits = 0
  var accumulated_credits = 0
  var accumulated_conceitos = 0
  var accumulated_unique = 0

  var accumulated_credits_free = 0
  var accumulated_credits_limited = 0
  var accumulated_credits_mandatory = 0

  for(let year in hash_disciplinas) {
    for(let period in hash_disciplinas[year]) {
      var period_credits = 0
      var conceitos_quad = 0
      var period_unique = 0
      var period_aprovados = 0

      var credits_free = 0
      var credits_mandatory = 0
      var credits_limited = 0

      for(let disciplina in hash_disciplinas[year][period]) {
        var current_disciplina = hash_disciplinas[year][period][disciplina]
        var creditos = parseInt(current_disciplina.creditos)
        var convertable = convertLetterToNumber(current_disciplina.conceito) * creditos

        const category = parseCategory(current_disciplina.categoria)
        if(category) {
          if(category == 'free') credits_free += creditos
          if(category == 'mandatory') credits_mandatory += creditos
          if(category == 'limited') credits_limited += creditos
        }

        if(isNaN(convertable) || convertable < 0) {
          if(isAprovado(current_disciplina.conceito)) {
              executed_credits += creditos
           }
          continue
        }

        conceitos_quad += convertable
        executed_credits += creditos
        period_credits += creditos

        if(isAprovado(current_disciplina.conceito)) {
          period_aprovados += creditos
        }

        var codigo = hash_disciplinas[year][period][disciplina].codigo
        // name based is better then code based, disciplines can change their code
        // but have the smae name
        var nomeDisc = current_disciplina.disciplina
        if(!(nomeDisc in uniqueDisc)) {
          unique[codigo] = true
          uniqueDisc[nomeDisc] = true
          accumulated_unique += creditos
          period_unique += creditos
        }
      }

      accumulated_credits += period_credits
      accumulated_conceitos += conceitos_quad
      accumulated_credits_free += credits_free
      accumulated_credits_limited += credits_limited
      accumulated_credits_mandatory += credits_mandatory

      var ca_quad = period_unique == 0 ? 0 : conceitos_quad / period_unique
      var ca_acumulado = accumulated_unique == 0 ? 0 : accumulated_conceitos / accumulated_unique
      var cr_quad = period_credits == 0 ? 0 : conceitos_quad / period_credits
      var cr_acumulado =  accumulated_credits == 0 ? 0 : accumulated_conceitos / accumulated_credits
      var percentage_approved = period_credits == 0 ? 0 : period_aprovados / period_credits

      var cp_acumulado = null
      if(graduation && graduation.credits_total && graduation.limited_credits_number && graduation.free_credits_number && graduation.mandatory_credits_number) {
        const totalFreeCredits = Math.min(accumulated_credits_free, graduation.free_credits_number)
        const totalLimitedCredits = Math.min(accumulated_credits_limited, graduation.limited_credits_number)
        const totalMandatoryCredits = Math.min(accumulated_credits_mandatory, graduation.mandatory_credits_number)

        const totalCredits = Math.max(totalFreeCredits, 0) + Math.max(totalLimitedCredits, 0) + Math.max(totalMandatoryCredits, 0)
        cp_acumulado = ((totalCredits * 1) / graduation.credits_total)
      }

      hash_disciplinas[year][period] = {
        'ca_quad' : ca_quad,
        'ca_acumulado' : ca_acumulado,
        'cr_quad' : cr_quad,
        'cr_acumulado' : cr_acumulado,
        'cp_acumulado' : round(cp_acumulado, 3),
        'percentage_approved' : percentage_approved,
        'accumulated_credits': accumulated_credits,
        'period_credits': period_credits,
        'executed_credits': executed_credits
      }
    }
  }

  return hash_disciplinas
}

function isAprovado (letter) {
  if(letter !== 'F' && letter !== '0' && letter !== 'O' && letter !== 'I') return true
}

function convertLetterToNumber(letter) {
  if(letter === 'A') return 4
  else if(letter === 'B') return 3
  else if(letter === 'C') return 2
  else if(letter === 'D') return 1
  else if(letter === 'F') return 0
  else if(letter === 'O') return 0

  else if(letter === '-') return -1
  else if(letter === 'E') return -1
  else if(letter === 'I') return -1
}

function parseCategory(category) {
  if(category === 'Livre Escolha') return 'free'
  else if(category === 'Obrigatória') return 'mandatory'
  else if(category === 'Opção Limitada') return 'limited'
}

const round = (num, places) => {
  if (!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + places)  + "e-" + places);
  } else {
    let arr = ("" + num).split("e");
    let sig = ""
    if (+arr[1] + places > 0) {
      sig = "+";
    }

    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
  }
}