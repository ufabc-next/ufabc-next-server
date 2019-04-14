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

  analysis: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'analysis'
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
  this.wasNew = this.isNew

  // Validate if reaction is equal
  let slug = `${this.kind}:${this.analysis._id}:${this.user._id}`
  if(this.isNew) {
    let equalReaction = await this.constructor.findOne({ slug: slug })
    if(equalReaction) throw new errors.BadRequest(`You cannot react 2 identical times in the same analysis`)
    this.slug = slug
  }

  await validateRules(this)
})

async function validateRules(reaction){
  if(this.kind == 'recommendation') {
    // TODO valida se usuario ja fez materia com aquele professor
  }
}

Model.post('save', async function(){
  await computeReactions(this)
})

async function computeReactions(doc) {

  const Analysis = app.models.analysis

  let analyses = await Analysis.find({ active: true })

  await Promise.all(analyses.map(async function(a)  {
    a.reactionsCount = {
      like: await doc.constructor.count({ analysis: a.id, kind: 'like' }),
      recommendation: await doc.constructor.count({ analysis: a.id, kind: 'recommendation' }),
      star: await doc.constructor.count({ analysis: a.id, kind: 'star' })
    }
    await a.save()
  }))
}
