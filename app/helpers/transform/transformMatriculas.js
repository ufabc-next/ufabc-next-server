module.exports = function transformMatriculas(data) {
  var matriculas = {}

  for(var aluno_id in data) {
    const matriculasAluno = data[aluno_id]
    matriculasAluno.forEach(matricula => {
      matriculas[matricula] = (matriculas[matricula] || []).concat([parseInt(aluno_id)])
    })
  }

  return matriculas
}