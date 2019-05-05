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
    if(equalReaction) throw new errors.BadRequest(`Você não pode reagir duas vezes iguais ao mesmo comentário`)
    this.slug = slug
  }
  await validateRules(this)
})

async function validateRules(reaction){
  const Enrollment = app.models.enrollments
  const User = app.models.users
  const Comment = app.models.comments

  if(reaction.kind == 'recommendation') {
    const isValidId = mongoose.Types.ObjectId.isValid

    const user = isValidId(reaction.user) ? await User.findById(reaction.user) : reaction.user

    const comment = isValidId(reaction.comment) ? await Comment.findById(reaction.comment) : reaction.comment

    let isValid = await Enrollment.findOne({
      ra: user.ra,
      $or: [{ teoria: comment.teacher }, { pratica: comment.teacher }]
    })
    if(!isValid) throw new errors.BadRequest(`Você não pode recomendar este comentário, pois não fez nenhuma matéria com este professor`)
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

  // let commentId = doc.comment._id ? doc.comment._id : doc.comment

  // let comments = await Comment.find({ _id: commentId })

  // await Promise.all(comments.map(async function(a)  {
  //   a.reactionsCount = {
  //     like: await doc.constructor.count({ comment: a.id, kind: 'like' }),
  //     recommendation: await doc.constructor.count({ comment: a.id, kind: 'recommendation' }),
  //     star: await doc.constructor.count({ comment: a.id, kind: 'star' })
  //   }
  //   await a.save()
  // }))

  const commentId = doc.comment._id || doc.comment

  await Comment.findOneAndUpdate(
    { _id: commentId },
    { [`reactionsCount.${doc.kind}`]: await doc.constructor.count({ comment: commentId, kind: doc.kind })}
  )
}

Model.index({ comment: 1, kind: 1 })
