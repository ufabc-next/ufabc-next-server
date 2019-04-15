const _ = require('lodash')
const errors = require('@/errors')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const app = require('@/app')

const Reactions = require('./reactions')

var Model = module.exports = Schema({
  comment: {
    type: String,
    required: true
  },

  enrollment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'enrollments'
  },

  active: {
    type: Boolean,
    default: true
  },

  mainTeacher: {
    type: Schema.Types.ObjectId,
    ref: 'teachers',
    required: true
  },

  subject: {
    type: Schema.Types.ObjectId,
    ref: 'subjects',
    required: true
  },

  disciplina: {
    type: String,
    required: true
  },

  reactionsCount: Object
},{ toObject: { virtuals: true }})

Model.pre('save', async function(){

  // Validate if this user has already comment is this enrollment
  if(this.isNew) {
    let enrollment = await this.constructor.findOne({ enrollment: this.enrollment, active: true })
    if(enrollment) throw new errors.BadRequest(`You can only comment one time is this enrollment: ${this.enrollment}`)
  }

  if(!this.isNew && this.isModified('active') && !this.active) {
    // TODO set all reactions to active false
  }

  if(!this.isNew && this.isModified('active') && this.active) {
    // TODO set all reactions to active true
  }
})

Model.static('analysisByReactions', async function(query, userId){
  const Reactions = app.models.reactions

  if(!userId) throw new errors.BadRequest(`Missing userId ${userId}`)

  let response = await this.find(query).lean(true)

  await Promise.all(response.map(async r => {
    r.myReactions = {
      like: !!(await Reactions.count({ analysis: String(r._id), user: String(userId), kind: 'like' })),
      recommendation: !!(await Reactions.count({ analysis: String(r._id), user: String(userId), kind: 'recommendation' })),
      star: !!(await Reactions.count({ analysis: String(r._id), user: String(userId), kind: 'star' }))
    }
    return r
  }))

  return response
})