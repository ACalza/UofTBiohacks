var mongoose = require('mongoose');

//Create and compile schema
var userSchema = mongoose.Schema({
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
    school:  String, //Won't be required
    github: String,
    about: String, //Likely to be mandatory, for now no.
    program: String


});

module.exports = mongoose.model('user', userSchema);;
