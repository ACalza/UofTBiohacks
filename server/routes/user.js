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

router.use('/register', userMiddlewares.validateRegistration);
router.post('/register', userMiddlewares.saveUsertoDatabase);


router.post('/login', userMiddlewares.requestLogin);
// logging out
router.get('/logout', function*(){
    this.body = {
        message: "logged out"
    };
});


module.exports = router;
