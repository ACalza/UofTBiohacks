"use strict"
// Require modules
const jwt = require('koa-jwt');
const bcrypt = require('bcrypt');
// Require internally
const util = require('../util');                      // for error function
const config = require('../config');                  // temporary KEY
const User = require('../models/user');               // User is user Model
const Group = require('../models/group');

// trim form data, validate not undefined, and check for duplicates in the database
module.exports.validateRegistration = function* (next) {
  this.request.body.email = util.trim(this.request.body.email)
  this.request.body.username = util.trim(this.request.body.username)
  this.request.body.name = util.trim(this.request.body.name)

  let email = this.request.body.email
  let password = this.request.body.password
  let name = this.request.body.name
  let username = this.request.body.username
  // If name, password or email does not exist
  if (!email || !password || !name || !username || password.length < 8) {
    this.response.status = 400 // set response status before sending
    util.errorResponse(this)
  } else if (!this.checkBody('email').isEmail().goOn) {
    this.response.status = 400
    util.errorResponse(this)
  } else {
    let modelByEmail = yield User.findOne({
      email: this.request.body.email
    })
    let modelByUsername = yield User.findOne({
      username: this.request.body.username
    })
    if (modelByEmail || modelByUsername) { // if email OR username already in database
      if (modelByEmail) {
        this.body = {
          message: "Email already exists"
        }
      } else {
        this.body = {
          message: "Username already exists"
        }
      }
    } else {
      // Authentication complete
      yield next
    }
  }
}

// save POST data to user model and store in database, while issuing a token
module.exports.saveUsertoDatabase = function* (){
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

function* getGroupInvites(userModel){
  let groupInvites = []
  if(userModel.invites){
    for(let i = 0; i < userModel.invites.length; i++){
      groupInvites.push(yield Group.findById(userModel.invites[i]))
    }
  }
  return groupInvites;
}

// check for invalid input, query database for matching email and password and grant token?
module.exports.requestLogin = function* (next){
  // assign variable
  let emailOrUsername = util.trim(this.request.body.emailOrUsername)
  let password = this.request.body.password
  let model;
  // check for invalid input
  if (!emailOrUsername || !password) {
    this.response.status = 400
    util.errorResponse(this)
  } else {
     // try/catch
     try {
        // query database for matching email OR username
        model = yield User.findOne({ $or: [{email:emailOrUsername}, {username: emailOrUsername}]})
      // check for matching password
      if (model && bcrypt.compareSync(password, model.password)) {
          // mask password and grant token
          model.password = undefined;
          this.userModel = model
          let token = jwt.sign({
            userModel: model
          }, config.SECRET, {
           expiresInMinutes: 60 * 5       // session expiration time
          });
          let groupModel = null;
          if(this.userModel.group){
            groupModel = yield Group.findById(this.userModel.group)
          }else{
            model = model.toJSON()
            model.invites = yield getGroupInvites(model)
            console.log(model)
          }


         this.body = {
           token: token,
           userModel: model,
           groupModel: groupModel
         };
       } else {                           // authentication fails
         this.body = {
           message: "Wrong password and/or emailOrUsername"
         }
       }
     } catch (err) {
       this.response.status = 500
       console.error(err)
       util.errorResponse(this)
     }


  }
}
