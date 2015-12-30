'use strict'

const Router = require('koa-router');
const User = require('../models/user');
const util = require('../util');
const bcrypt = require('bcrypt');
const streamify = require('stream-array');
const through = require('through2');
const validate = require('koa-validate')

/**
 * Register user router
 * @param  Koa app
 * @return N/A
 */
module.exports = function(app) {

  //API with prefix /user to each route
  let router = new Router({
    prefix: '/user'
  });

  //Adds validateUser to middleware
  router.use('/register', validateUser)

  /**
   * Route for registering a user
   */
  router.post('/register', function*() {
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
      var model = yield user.save()                     // save new user in database
      this.body = model
        //Start session
      this.session.userModel = model
    } catch (err) {
      this.response.status = 500
      console.error(err)
      util.errorResponse(this)
    }
  })

  /**
   * Route for logging in a user
   */
  router.post('/login', function*() {
    let email = this.request.body.email
    let password = this.request.body.password
    let username = this.request.body.username
    if (!email || !password || !username) {
      this.response.status = 400
      util.errorResponse(this)
    } else {
      // Add try catch
      try {
        let model = yield User.findOne({
          email: email
        })

        if (model && bcrypt.compareSync(password, model.password)) {
          // Start session
          this.session.userModel = model
          this.body = {
            message: "logged in!"
          }
          console.log(this.session)
        } else {
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
  });


  /**
   *  logs out user
   */
  router.get('/logout', function*() {
    this.session = null
    this.body = {
      message: "logged out"
    }
  })

  //validate admin middleware
  router.use('/all', validateAdmin);
  //Middleware to get all users
  router.use('/all', getUsers);

  /**
   * Returns all users in a JSON array without encrypted password
   * Must be admin
   */
  router.get('/all', function*() {
    this.body = this.users;
  });

  // //validate admin middleware
  // router.use('/all/csv', validateAdmin);
  // //Middleware to get all users
  // router.use('/all', getUsers);

  /**
   * Downloads a CSV file of the users
   */
  router.get('/all/csv', function*() {
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

    })

    /**
     * Temporary to test session
     */
  router.get('/session', function*() {
    this.body = {
      session: this.session.userModel
    }
  });

  app.use(router.routes())
  app.use(router.allowedMethods())
}



//FUNCTIONS
/**
 * returns all users in an array of JSON's w/o passwords
 */
function* getUsers(next) {
    try {
      var users = yield User.find({});
      for (var i = 0; i < users.length; i++) {
        users[i].password = undefined;
      }
      this.users = users;
      yield next
    } catch (err) {
      console.error(err);
      this.response.status = 500;
      util.errorResponse(this);
    }
  }
/**
* Validates admin
*/
function* validateAdmin(next) {
    console.log(this.session)
    if (this.session.userModel && this.session.userModel.username === 'igemuoft' && this.session.userModel.email === 'igem@g.skule.ca') {
      yield next;
    } else {
      this.response.status = 403;
      util.errorResponse(this);
    }
  }
  /**
   * Validates the user
   * @param  Koa middlware object next
   * @return N/A
   */

function checkandtrim(input){
    if (input.trim()){              // if input is not empty or whitespace
        return input.trim()
    }
    return null
}

function* validateUser(next) {
  this.request.body.email = checkandtrim(this.request.body.email)
  this.request.body.username = checkandtrim(this.request.body.username)
  this.request.body.name = checkandtrim(this.request.body.name)

  let email = this.request.body.email
  let password = this.request.body.password
  let name = this.request.body.name
  let username = this.request.body.username

  // If name, password or email does not exist
  if (!email || !password || !name || !username || password.length <= 8) {
    this.response.status = 400                                  // set response status before sending
    this.response.message = 'some field is missing or incorrect'
    util.errorResponse(this)
  }else if (!this.checkBody('email').isEmail().goOn){
    this.response.status = 400
    this.response.message = 'invalid email'
    util.errorResponse(this)
  }else {
    let modelByEmail = yield User.findOne({
      email: this.request.body.email
    })
    let modelByUsername = yield User.findOne({
      username: this.request.body.username
    })
    if (modelByEmail || modelByUsername) {                     // if email OR username already in database
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
