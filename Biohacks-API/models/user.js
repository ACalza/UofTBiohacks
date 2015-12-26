var mongoose = require('mongoose');

//Create and compile schema
var userSchema = mongoose.Schema({
    email: String
});

module.exports = mongoose.model('user', userSchema);;
