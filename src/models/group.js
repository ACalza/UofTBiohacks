"use strict"
const mongoose = require('mongoose');
//Create and compile schema
let groupSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
        unique: true
    },
    users: [String]
});

module.exports = mongoose.model('group', groupSchema);;
