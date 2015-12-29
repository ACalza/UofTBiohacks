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
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  group: mongoose.Schema.ObjectId,
  school: String, //Won't be required
  github: String,
  about: String, //Likely to be mandatory, for now no.
  program: String
})

module.exports = mongoose.model('user', userSchema)
