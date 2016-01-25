"use strict"
// Require modules
const jwt = require('koa-jwt');
const bcrypt = require('bcrypt');
const json2xls = require('json2xls');
const fs = require('fs');
const streamify = require('stream-array');
const through = require('through2');
// Require internally
const util = require('../util'); // for error function
const config = require('../config'); // temporary KEY
const User = require('../models/user'); // User is user Model
const Group = require('../models/group');
const crypto = require('crypto-promise')
const async = require('async');
const nodemailer = require('nodemailer');
const Promise = require('bluebird');
const sgTransport = require('nodemailer-sendgrid-transport');

// function(body)
const template = require('../templates/template.js')


// POST /user/register    trim form data, validate not undefined, and check for duplicates in the database
module.exports.validateRegistration = function*(next) {
  this.request.body.email = util.trim(this.request.body.email)
  this.request.body.username = util.trim(this.request.body.username)
  this.request.body.name = util.trim(this.request.body.name)
  console.log(this.request.body)
  let email = this.request.body.email
  let password = this.request.body.password
  let name = this.request.body.name
  let username = this.request.body.username
  let education = this.request.body.education
  let year = this.request.body.year
  let codingbackground = this.request.body.codingbackground
  // let likeToSee = this.request.body.likeToSee
  // let questions = this.request.body.questions
    // If name, password or email does not exist

  if (!email || !password || !name || !username || password.length < 8 || !year
      || !education || !codingbackground) {
    this.response.status = 400 // set response status before sending
    return this.body = {
      message: "Not all fields were filled in"
    }
  } else if (!this.checkBody('email').isEmail().goOn) {
    this.response.status = 400
    util.errorResponse(this)
  } else{
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

module.exports.registerUserToDatabase = function*(){
  let modelByEmail = yield User.findOne({
    email: this.request.body.email
  })


  if (modelByEmail) {
    console.log("why?")
    return this.body = {
      message: "Email already exists"
    }
  }
  let user = new User({
    email: this.request.body.email
  })
  try {
    var model = yield user.save() // save new user in database
    console.log(model)
    console.log("here")
    let options = {
      auth : {
        api_user: config.api_user,
        api_key: config.api_key
      }
    }
    let client = nodemailer.createTransport(sgTransport(options));
    let email = {
      from: 'igem@g.skule.ca',
      to: this.request.body.email,
      subject: 'UofT Biohacks',
      html: template('<h2>Thank you!</h2>' +
        'Thank you for signing up. We will get back to you soon!'
      )
    };
    yield sendMail(client, email);
    this.body = {
      message: "Successfully registered, an email will be sent shortly",
      success: true
    }
  } catch (err) {
    this.response.status = 500
    console.error(err)
    util.errorResponse(this)
  }
}

// POST /user/register    save POST data to user model and store in database, while issuing a token
module.exports.saveUsertoDatabase = function*() {
  let user = new User({
    email: this.request.body.email,
    password: util.bcrypt(this.request.body.password), //8 bit hashing 2^8 rounds is sufficent for now
    name: this.request.body.name,
    username: this.request.body.username,
    howDidYouHear: this.request.body.howDidYouHear,
    codingbackground: this.request.body.codingbackground,
    likeToSee: this.request.body.likeToSee,
    year: this.request.body.year,
    questions: this.request.body.questions,
    education: this.request.body.education
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
      token: token,
      message: "Successfully registered",
      userModel: model
    };
  } catch (err) {
    this.response.status = 500
    console.error(err)
    util.errorResponse(this)
  }
}

// POST /user/login       check for invalid input, query database for matching email and password and grant token
module.exports.requestLogin = function*(next) {
  // assign variable
  let emailOrUsername = util.trim(this.request.body.emailOrUsername)
  let password = this.request.body.password
    // check for invalid input
  if (!emailOrUsername || !password) {
    this.response.status = 400
    util.errorResponse(this)
  } else {
    try {
      // query database for matching email OR username
      let userModel = yield User.findOne({
          $or: [{
            email: emailOrUsername
          }, {
            username: emailOrUsername
          }]
        }).populate('invites').exec()
        // check for matching password
      if (userModel && bcrypt.compareSync(password, userModel.password)) {
        // mask password and grant token
        userModel.password = undefined;
        this.userModel = userModel // this.userModel persists for the entire session
        let token = jwt.sign({
          userModel: userModel
        }, config.SECRET, {
          expiresInMinutes: 60 * 5
        });

        let groupModel = null;
        if (this.userModel.group) { // return just groupModel if user has a group already
          groupModel = yield Group.findById(this.userModel.group).populate('users').exec()
        } else {
          userModel = yield User.findById(this.userModel._id).populate('invites').exec() // otherwise fill userModel.invit
        }
        this.body = {
          token: token,
          userModel: userModel,
          message: "Welcome, " + userModel.name, // user.invites and user.group is populated
          groupModel: groupModel
        };
      } else { // authentication fails
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

// middleware /user/all            attach all user data to this.users
module.exports.getUsers = function*(next) {
    try {
      var users = yield User.find({}).populate('invites group').exec();
      for (var i = 0; i < users.length; i++) {
        users[i] = users[i].toJSON()
        users[i].password = undefined;
        users[i]._id = undefined;
        users[i].__v = undefined;
        users[i].invites = undefined;
        if (users[i].group) {
          users[i].group = users[i].group.name
        }
      }
      this.users = users;
      yield next;
    } catch (err) {
      console.error(err);
      this.response.status = 500;
      util.errorResponse(this);
    }
  }
  // middlware /user/all and /user/all/csv
module.exports.validateAdmin = function*(next) {
  if (this.userModel && this.userModel.username === 'admin' && this.userModel.email === 'igem@g.skule.ca') {
    yield next;
  } else {
    this.response.status = 403;
    util.errorResponse(this);
  }
}

// GET   /user/all/csv    downloads CSV containing userdata
module.exports.getCSV = function*() {
  this.response.set('Content-disposition', 'attachment; filename=users.csv');
  this.type = 'text/csv';

  let data = [{
    email: "email",
    name: "name",
    username: "username",
    group: "group"
  }].concat(this.users);
  this.body = streamify(data)
    .pipe(through.obj(function(chunk, enc, callback) {
      let curRow = chunk.email + ', ' + chunk.name + ', ' + chunk.username + ',' + chunk.group + '\n';
      this.push(curRow);

      callback()
    }))
}

function sendMail(client, email) {
  return new Promise(function(res, rej) {
    client.sendMail(email, function cb(err, data) {
      if (err) rej(err)
      else res(data)
    });
  });
}
module.exports.resetPassword = function* (){
  try{
    let user = yield User.findOne({ resetPasswordToken: this.token, resetPasswordExpires: { $gt: Date.now() }})
    console.log(this.token)
    console.log("HERe")
    if(!user){
      this.response.redirect("http://localhost:3001/reset?t="+ this.token)
    }else{
      this.response.redirect("http://localhost:3001/")
    }

  }catch(err){
    console.error(err)
    this.response.status = 500
    util.errorResponse(this)
  }
}
module.exports.forgotPassword = function*() {
  let token = yield crypto.randomBytes(20);
  token = token.toString('hex');
  try {
    let user = yield User.findOne({
      email: this.request.body.email
    })
    if (!user) {
      return this.body = {
        message: "No account with that email exists",
        success: false
      }
    }
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000 //1 hour
    user = yield user.save()
    let options = {
      auth : {
        api_user: config.api_user,
        api_key: config.api_key
      }
    }
    let client = nodemailer.createTransport(sgTransport(options));

    const resetLink = 'http://' + this.request.host + 'user/reset/' + token
    let email = {
      from: 'igem@g.skule.ca',
      to: user.email,
      subject: 'UofT Biohacks Password Reset',
      html: template(
        '<p>' +
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.<br>' +
          'Please click on the following link, or paste this into your browser to complete the process:<br><br>' +
          `<a href="${resetLink}">${resetLink}</a>` +
          'If you did not request this, please ignore this email and your password will remain unchanged.<br>' +
        '</p>'
      )
      // html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      //     'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      //     'http://' + this.request.host + 'user/reset/' + token + '\n\n' +
      //     'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    yield sendMail(client, email);
    this.body = {
      message: "An email will be sent shortly to reset your password",
      success: true
    }
  } catch (err) {
    console.error(err)
    this.response.status = 500;
    util.errorResponse(this);
  }
}
