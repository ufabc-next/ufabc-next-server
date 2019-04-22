module.exports = function (app, ids) {
  return  [
    {
      "year": 2019,
      "quad": 1,
      "ra": "11201822483",
      "codigo": "NA2ESTG017-17SB",
      "disciplina": "Abordagens Tradicionais das Relações Internacionais",
      "campus": "sao bernardo",
      "turno": "noturno",
      "turma": "A2",
      "teoria": ids.teachers[0]._id,
      "pratica": ids.teachers[0]._id,
      "identifier": "79788a4ea84a724f1c6106fd8b33ecda",
      "mainTeacher": ids.teachers[0]._id,
      "subject": ids.subjects[0]._id
    },
  ]
}