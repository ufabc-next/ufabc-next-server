const _ = require('lodash')
const errors = require('@/errors')
const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const Reactions = require('./reactions')

var Model = module.exports = Schema({
  comment: {
    type: String,
    required: true
  },

  identifier: {
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
})

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