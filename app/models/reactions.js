const _ = require('lodash')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema
const errors = require('@/errors')

const app = require('@/app')

var Model = module.exports = Schema({
  kind: {
    type: String,
    required: true,
    enum: ['like', 'recommendation', 'star']
  },

  comment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'comments'
  },

  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },

  active: {
    type: Boolean,
    default: true
  },

  slug: {
    type: String,
  }
})

Model.pre('save', async function(){
  // Validate if reaction is equal
  let slug = `${this.kind}:${this.comment._id}:${this.user._id}`
  if(this.isNew) {
    let equalReaction = await this.constructor.findOne({ slug: slug })
    if(equalReaction) throw new errors.BadRequest(`You cannot react 2 identical times in the same comment`)
    this.slug = slug
  }
  await validateRules(this)
})

async function validateRules(reaction){
  const Enrollment = app.models.enrollments

  if(reaction.kind == 'recommendation') {
    let user = reaction.user
    let comment = reaction.comment
    let isValid = await Enrollment.findOne({ ra: user.ra, subject: comment.subject, mainTeacher: comment.mainTeacher })
    if(!isValid) throw new errors.BadRequest(`You cannot react with kind recommendation is this comment`)
  }
}

Model.post('save', async function(){
  await computeReactions(this)
})

Model.post('remove', async function(){
  await computeReactions(this)
})

async function computeReactions(doc) {

  const Comment = app.models.comments

  let comments = await Comment.find({ active: true })

  await Promise.all(comments.map(async function(a)  {
    a.reactionsCount = {
      like: await doc.constructor.count({ comment: a.id, kind: 'like' }),
      recommendation: await doc.constructor.count({ comment: a.id, kind: 'recommendation' }),
      star: await doc.constructor.count({ comment: a.id, kind: 'star' })
    }
    await a.save()
  }))
}
