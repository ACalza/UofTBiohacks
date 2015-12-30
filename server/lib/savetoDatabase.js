"use strict"
// Require modules
const jwt = require('koa-jwt');
// Require internally
const util = require('../util');                      // for error function
const config = require('../config');                  // temporary KEY
const User = require('../models/user');               // User is User Model


function* savetoDatabase(){
    let user = new User({
        email: this.request.body.email,
        password: util.bcrypt(this.request.body.password), //8 bit hashing 2^8 rounds is sufficent for now
        name: this.request.body.name,
        username: this.request.body.username,
        school: this.request.body.school,
        github: this.request.body.github,
        about: this.request.body.about
    })
    try {
        var model = yield user.save() // save new user in database
        model.password = undefined;
        let token = jwt.sign({
        userModel: model
      }, config.SECRET, {
        expiresInMinutes: 60 * 5
      });
      this.body = {
      token: token
      };
    } catch (err) {
      this.response.status = 500
      console.error(err)
      util.errorResponse(this)
    }
}
module.exports = savetoDatabase;
