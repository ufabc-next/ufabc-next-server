module.exports = function (app, ids) {
  return  [
    {
      "_id": '000000000000000000000001',
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
      "subject": ids.subjects[0]._id,
      "conceito": "B",
      "creditos": 3
    },

    {
      "_id": '000000000000000000000002',
      "year": 2019,
      "quad": 1,
      "ra": "11201822479",
      "codigo": "NA2ESTG017-17SB",
      "disciplina": "Geometria Analítica",
      "campus": "sao bernardo",
      "turno": "noturno",
      "turma": "A2",
      "teoria": ids.teachers[101]._id,
      "identifier": "79788a4ea84a724f1c6106fd8b33ecda",
      "mainTeacher": ids.teachers[101]._id,
      "subject": ids.subjects[392]._id,
      "conceito": "D",
      "creditos": 3
    },

    {
      "_id": '000000000000000000000003',
      "year": 2019,
      "quad": 1,
      "ra": "11201822479",
      "codigo": "NA2ESTG017-17SB",
      "disciplina": "Bases Computacionais da Ciência",
      "campus": "sao bernardo",
      "turno": "noturno",
      "turma": "A2",
      "pratica": ids.teachers[608]._id,
      "identifier": "79788a4ea84a724f1c6106fd8b33ecda",
      "mainTeacher": ids.teachers[608]._id,
      "subject": ids.subjects[63]._id,
      "conceito": "A",
      "creditos": 2
    },

    {
      "_id": '000000000000000000000004',
      "year": 2019,
      "quad": 1,
      "ra": "11201822479",
      "codigo": "NA2ESTG017-17SB",
      "disciplina": "Processamento da Informação",
      "campus": "sao bernardo",
      "turno": "noturno",
      "turma": "A2",
      "pratica": ids.teachers[132]._id,
      "teoria": ids.teachers[265]._id,
      "identifier": "79788a4ea84a724f1c6106fd8b33ecda",
      "mainTeacher": ids.teachers[265]._id,
      "subject": ids.subjects[719]._id,
      "conceito": "B",
      "creditos": 5
    },

    {
      "_id": '000000000000000000000005',
      "year": 2019,
      "quad": 1,
      "ra": "11201822479",
      "codigo": "NA2ESTG017-17SB",
      "disciplina": "Ciência, Tecnologia e Sociedade",
      "campus": "santo andre",
      "turno": "diurno",
      "turma": "B2",
      "pratica": ids.teachers[335]._id,
      "teoria": ids.teachers[335]._id,
      "identifier": "79788a4ea84a724f1c6106fd8b33ecda",
      "mainTeacher": ids.teachers[335]._id,
      "subject": ids.subjects[115]._id,
      "conceito": "A",
      "creditos": 3
    },

     {
      "_id": '000000000000000000000006',
      "year": 2019,
      "quad": 1,
      "ra": "11201822479",
      "codigo": "NA2ESTG017-17SB",
      "disciplina": "Bioquímica: estrutura, propriedade e funções de biomoléculas",
      "campus": "sao bernardo",
      "turno": "noturno",
      "turma": "C3",
      "identifier": "79788a4ea84a724f1c6106fd8b33ecda",
      "subject": ids.subjects[991]._id,
      "conceito": "A",
      "creditos": 3
    }
  ]
}