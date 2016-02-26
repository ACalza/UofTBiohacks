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
    required: true,
    select:false
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
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  verificationToken: {
    required: true,
    type: String
  },
  isinvited: Boolean,
  doesAcceptInvite: Boolean,
  invites:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }], //Invites to groups
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
  hearFrom: String,
  codingBackground: String,
  likeToSee: String,
  github: String,
  education: String,
  mentor: Boolean,
  autogroup: Boolean,
  scienceType: String,
  school: String,
  year: Number,
  about: String,
  questions: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
})

module.exports = mongoose.model('User', userSchema)
