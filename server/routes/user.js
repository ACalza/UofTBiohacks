'use strict'
//
    //=====>POST form data to be stored in mongoDB
//
// Require modules
const Router = require('koa-router');
const jwt = require('koa-jwt');
// Require internally
const userMiddlewares = require('./userMiddlewares');
const util = require('../util');                      // for error function
const config = require('../config');                  // temporary KEY
const User = require('../models/user');               // User is User Model

 // Initiate router instance
let router = new Router();

// trim form data, validate not undefined, and check for duplicates in the database
router.use('/register', userMiddlewares.validateRegistration);

// save POST data to user model and store in database, while issuing a token
router.post('/register', userMiddlewares.saveUsertoDatabase);

// check for invalid input, query database for matching email and password and grant token?
router.post('/login', userMiddlewares.requestLogin);

// logging out
router.get('/logout', function*(){
    this.body = {
        message: "logged out"
    };
});


module.exports = router;
