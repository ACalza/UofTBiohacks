'use strict'

const mongoose = require('mongoose')

//Create and compile schema
let groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  // Could change to string later
  // If it's id we can ref and .populate
  users: [mongoose.Schema.ObjectId]
})

module.exports = mongoose.model('group', groupSchema)
