var mongoose = require('mongoose');
//Create and compile schema
var groupSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
        unique: true
    },
    users: [String]
});

module.exports = mongoose.model('group', groupSchema);;
