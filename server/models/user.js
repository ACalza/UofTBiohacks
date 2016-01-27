'use strict'

const mongoose = require('mongoose')

// Create and compile schema
// TODO Build parts from shared/user-registration.js
let userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  invites:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }], //Invites to groups
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
  howDidYouHear: String, //Won't be required
  codingbackground: String,
  likeToSee: String,
  education: String,
  year: Number,
  questions: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
})

module.exports = mongoose.model('User', userSchema)
