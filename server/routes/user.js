'use strict'
//
    //=====>POST form data to be stored in mongoDB
//
// Require modules
const Router = require('koa-router');
// Require internally
const validateRegistration = require('../lib/validateRegistration');
const savetoDatabase = require('../lib/savetoDatabase');
const requestLogin = require('../lib/requestLogin');
 // Initiate router instance
let router = new Router();

// trim form data, validate not undefined, and check for duplicates in the database
router.use('/register', validateRegistration);

// save POST data to user model and store in database, while issuing a token
router.post('/register', savetoDatabase);

// check for invalid input, query database for matching email and password and grant token?
router.post('/login', requestLogin);

// logging out
router.get('/logout', function*(){
    this.body = {
        message: "logged out"
    };
});

module.exports = router;
