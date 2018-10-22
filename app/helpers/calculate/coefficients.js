// Calcules CA/CR for every given point of student history
// This is useful for discovering student CR/CA when he took a discipline
module.exports = function calculateAlunoCoefficientsData(disciplinas) {
    var hash_disciplinas = {};
    disciplinas.forEach(function (disciplina) {
      hash_disciplinas[disciplina.ano] = hash_disciplinas[disciplina.ano] || {};
      hash_disciplinas[disciplina.ano][disciplina.periodo] = hash_disciplinas[disciplina.ano][disciplina.periodo] || [];
      hash_disciplinas[disciplina.ano][disciplina.periodo].push(disciplina);
    })

    var unique = {};
    var uniqueDisc = {};
    var accumulated_credits = 0;
    var accumulated_conceitos = 0;
    var accumulated_unique = 0;

    for(year in hash_disciplinas) {
      for(period in hash_disciplinas[year]) {
        var period_credits = 0;
        var conceitos_quad = 0;
        var period_unique = 0;
        var period_aprovados = 0;

        for(disciplina in hash_disciplinas[year][period]) {
          var current_disciplina = hash_disciplinas[year][period][disciplina];
          var creditos = parseInt(current_disciplina.creditos);
          var convertable = convertLetterToNumber(current_disciplina.conceito) * creditos;

          if(isNaN(convertable) || convertable < 0) {
            continue
          }

          conceitos_quad += convertable;
          period_credits += creditos;

          if(isAprovado(current_disciplina.conceito)) {
            period_aprovados += creditos;
          };

          var codigo = hash_disciplinas[year][period][disciplina].codigo;
          // name based is better then code based, disciplines can change their code
          // but have the smae name
          var nomeDisc = current_disciplina.disciplina
          if(!(nomeDisc in uniqueDisc)) {
            unique[codigo] = true;
            uniqueDisc[nomeDisc] = true;
            accumulated_unique += creditos;
            period_unique += creditos;
          }
        }

        accumulated_credits += period_credits;
        accumulated_conceitos += conceitos_quad;

        var ca_quad = period_unique == 0 ? 0 : conceitos_quad / period_unique;
        var ca_acumulado = accumulated_unique == 0 ? 0 : accumulated_conceitos / accumulated_unique;
        var cr_quad = period_credits == 0 ? 0 : conceitos_quad / period_credits;
        var cr_acumulado =  accumulated_credits == 0 ? 0 : accumulated_conceitos / accumulated_credits;
        var percentage_approved = period_credits == 0 ? 0 : period_aprovados / period_credits;

        hash_disciplinas[year][period] = {
          "ca_quad" : ca_quad,
          "ca_acumulado" : ca_acumulado,
          "cr_quad" : cr_quad,
          "cr_acumulado" : cr_acumulado,
          "percentage_approved" : percentage_approved,
          "accumulated_credits": accumulated_credits,
          "period_credits": period_credits
        }
      }
    }

    return hash_disciplinas
}

function isAprovado (letter) {
  if(letter !== "F" && letter !== "0") return true;
}

function convertLetterToNumber(letter) {
  if(letter === "A") return 4;
  else if(letter === "B") return 3;
  else if(letter === "C") return 2;
  else if(letter === "D") return 1;
  else if(letter === "F") return 0;
  else if(letter === "O") return 0;

  else if(letter === "-") return -1;
  else if(letter === "E") return -1;
  else if(letter === "I") return -1;
}