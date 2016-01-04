"use strict"
// Require modules
const jwt = require('koa-jwt');
const bcrypt = require('bcrypt');
// Require internally
const util = require('../util');                      // for error function
const config = require('../config');                  // temporary KEY
const User = require('../models/user');               // User is User Model


function* requestLogin(next){

  // assign variable
  let email = util.trim(this.request.body.emailOrUsername)
  let password = this.request.body.password

  // check for invalid input
  if (!email || !password) {
    this.response.status = 400
    util.errorResponse(this)
  } else {
     // try/catch
     try {
        // query database for matching email
        let model = yield User.findOne({
          email: email
      })
      // check for matching password
      if (model && bcrypt.compareSync(password, model.password)) {
          // mask password and grant token
          model.password = undefined;
          let token = jwt.sign({
            userModel: model
          }, config.SECRET, {
           expiresInMinutes: 60 * 5       // session expiration time
          });
         this.body = {
           token: token                   // send off response
         };
       } else {                           // authentication fails
         this.body = {
           message: "Wrong password and/or email"
         }
       }
     } catch (err) {
       this.response.status = 500
       console.error(err)
       util.errorResponse(this)
     }


  }
}

module.exports = requestLogin;
