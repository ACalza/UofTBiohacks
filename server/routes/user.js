'use strict'
//
    //=====>POST form data to be stored in mongoDB
//
// Require modules
const Router = require('koa-router');
const jwt = require('koa-jwt');
// Require internally
const validateRegistration = require('../lib/validateRegistration');
const requestLogin = require('../lib/requestLogin');
const util = require('../util');                      // for error function
const config = require('../config');                  // temporary KEY
const User = require('../models/user');               // User is User Model

 // Initiate router instance
let router = new Router();

// trim form data, validate not undefined, and check for duplicates in the database
router.use('/register', validateRegistration);

// save POST data to user model and store in database, while issuing a token
router.post('/register', saveUsertoDatabase);

// check for invalid input, query database for matching email and password and grant token?
router.post('/login', requestLogin);

// logging out
router.get('/logout', function*(){
    this.body = {
        message: "logged out"
    };
});


//////////////////////////////////////////////////////////////////////////////////
// ==> FUNCTION <==  //

function* saveUsertoDatabase(){
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

module.exports = router;
