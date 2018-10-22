const _ = require('lodash')
const difflib = require('difflib')
const errors = require('@/errors')

module.exports = function resolveProfessor(name, teachers, extraMappings) {
  const mapping = {
    'Osmar Domingues Olavo Luppi Silva': "Osmar Domingues",
    'Vera Nagamuta Araujo': 'Vera Nagamuta',
    'Marina Sparvoli': 'Marina Sparvoli De Medeiros',
    'Luis Roberto De Paula Luciana Xavier Oliveira': "Luis Roberto De Paula",
    'Patricia Dantoni' : "Patricia Dantoni Alnis Bezerra",
    'Diego Azzi': 'Diego Araujo Azzi',
    'Adriana Pugliese' : "Adriana Pugliese Netto Lamas",
    'Victor Ximenes': 'Victor Ximenes Marques',
    'Marcelo Augusto Christoffolete Thiago Fernando Carrijo': 'Marcelo Augusto Christoffolete',
    'Murilo Bellezoni Loiola Anderson Leonardo Sanches': 'Murilo Bellezoni Loiola',
    'Silvia Titotto': 'Silvia Lenyra Meirelles Campos Titotto',
    'Flavio Rocha': "Flavio Rocha De Oliveira",
    'Ignat': 'Ignat Fialkovskiy',
    'Bruna Muriel': 'Bruna Muriel Huertas Fuscaldo',
    'Alexandre Zatkoviskis Carvalho E Diogo Librandi Rocha': "Alexandre Zatkovskis Carvalho",
    'Bruno Guzzo': "Bruno Guzzo Da Silva",
    'Mauricio Luperi E Guilherme Nobre': "Mauricio Martinelli Silva Luperi",
    'Maurcio Luperi': "Mauricio Martinelli Silva Luperi",
    'Ademir Pelizari Joao Vicente Akwa': 'Ademir Pelizari',
    'Vitor Vieira': 'Vitor Vieira Vasconcelos',
    'Carolina Moutinho Duque De Pinho Luis Roberto De Paula': 'Carolina Moutinho Duque De Pinho',
    'Arilson Favaretto': "Arilson Da Silva Favareto",
    'Vanessa Lucena Empinotti Arilson Da Silva': 'Vanessa Lucena Empinotti',
    'Carlos Eduardo Ribeiro Jose Luiz Bastos Neves': 'Carlos Eduardo Ribeiro',
    'Luciana Nicolau Ferrara Mariana Mencio': 'Luciana Nicolau Ferrara',
    'Cristiane Negreiros Abbud Ayoub Matteo Raschietti': 'Cristiane Negreiros Abbud Ayoub',
    'Acacio Almeida': "Acacio Sidinei Almeida Santos",
    'Marcos Barcellos De Souza Jeroen Klink': "Marcos Barcellos De Souza",
    'Hana Paula Masuda Ana Paula De': 'Hana Paula Masuda'
  }

  _.extend(mapping, extraMappings || {})

  if(!name) return null
  else if(name == 'N D' || name == 'Falso') return null
  else if(_.find(teachers, { name: name })) return _.find(teachers, { name: name })
  else if(name in mapping) {
    return _.find(teachers, { name: mapping[name] })
  }
  else {
    let bestMatch = difflib.getCloseMatches(name, _.map(teachers, 'name'))[0]
    let s = new difflib.SequenceMatcher(null, bestMatch, name);
    if(s.ratio() > 0.8) return _.find(teachers, { name: bestMatch })
    else {
      return { error : 'Missing Teacher: ' + name }
    }
  }
}