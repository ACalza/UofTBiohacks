'use strict'

const mongoose = require('mongoose')

//Create and compile schema
let groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  pendingInvites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // Could change to string later
  // If it's id we can ref and .populate
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', limit: 4 }]
})

module.exports = mongoose.model('Group', groupSchema)
