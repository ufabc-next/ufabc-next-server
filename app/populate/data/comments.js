module.exports = function (app, ids) {
  return [
    {
      comment: 'Muito bom',
      teacher: ids.teachers[0]._id,
      type: 'teoria',
      enrollment: '000000000000000000000001',
      subject: ids.subjects[0]._id,
      ra: 11201822483,
    },

    {
      comment: 'Morte à geometria analitica e vetores',
      type: 'teoria',
      enrollment: '000000000000000000000002',
      subject: ids.subjects[392]._id,
      teacher: ids.subjects[101]._id,
      ra: 11201822479,
    },

    {
      comment: 'Só alegria',
      teacher: ids.teachers[0]._id,
      type: 'teoria',
      enrollment: '000000000000000000000007',
      subject: ids.subjects[0]._id,
      ra: 11201822481,
    },
  ]
}
