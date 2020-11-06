const errors = require('@/errors')
const Schema = require('mongoose').Schema

const app = require('@/app')

var Model = module.exports = Schema({
  comment: {
    type: String,
    required: true
  },

  viewers: {
    type: Number,
    default: 0
  },

  enrollment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'enrollments'
  },

  type: {
    type: String,
    required: true,
    enum: ['teoria', 'pratica']
  },

  ra: {
    type: String,
    required: true
  },

  active: {
    type: Boolean,
    default: true
  },

  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'teachers',
    required: true
  },

  subject: {
    type: Schema.Types.ObjectId,
    ref: 'subjects',
    required: true
  },

  reactionsCount: Object
},{ toObject: { virtuals: true }})

Model.pre('save', async function(){
  // Validate if this user has already comment is this enrollment
  if(this.isNew) {
    let enrollment = await this.constructor.findOne({
      enrollment: this.enrollment,
      active: true,
      type: this.type
    }).lean(true)

    if(enrollment) throw new errors.BadRequest(`Você só pode comentar uma vez neste vínculo: ${this.enrollment}`)
  }
})

Model.post('save', async function () {
  const Enrollment = app.models.enrollments

  await Enrollment.findOneAndUpdate(
    { _id: this.enrollment },
    { $addToSet: { comments: [this.type] } }
  )
})

Model.post('find', async function(){
  await this.model.updateMany(this.getQuery(), { $inc: { viewers: 1 }})
})

Model.static('commentsByReactions', async function(query, userId, populateFields = ['enrollment', 'subject'], limit = 10, page = 0){
  const Reactions = app.models.reactions

  if(!userId) throw new errors.BadRequest(`Usuário não encontrado: ${userId}`)

  let response = await this.find(query)
    .lean(true)
    .populate(populateFields)
    .skip(Number(page*limit))
    .limit(Number(limit))
    .sort({ 'reactionsCount.recommendation': -1, 'reactionsCount.likes': -1, 'enrollment.year': 1, 'enrollment.quad': 1 })

  await Promise.all(response.map(async r => {
    r.myReactions = {
      like: !!(await Reactions.count({ comment: String(r._id), user: String(userId), kind: 'like' })),
      recommendation: !!(await Reactions.count({ comment: String(r._id), user: String(userId), kind: 'recommendation' })),
      star: !!(await Reactions.count({ comment: String(r._id), user: String(userId), kind: 'star' }))
    }
    return r
  }))

  return { data: response, total: await this.count(query)}
})

Model.index({ comment: 1, user: 1 })
Model.index({ reactionsCount: -1 })