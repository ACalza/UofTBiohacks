"use strict"

let Router = require('koa-router');
let User = require('../models/user');
let util = require('../util');


/**
 * Register user router
 * @param  Koa app
 * @return N/A
 */
function user (app) {

  let router = new Router({
    prefix: '/user'
  });

  /**
   * Route for registering a user
   */
  router.post('/register', function *(){
      let email = this.request.body.email;
      let password = this.request.body.password;
      let name = this.request.body.name;
      //If name, password or email does not exist
      if(!email || !password || !name){
          this.response.status = 400;
          util.errorResponse(this);
      }else{
          let user = new User({
              email: email,
              password: password,
              name: name,
              school: this.request.body.school,
              github: this.request.body.github,
              about: this.request.body.about
          });
          try{
              var model = yield user.save();
          }catch(err){
              this.response.status = 500;
              console.error(err);
              return util.errorResponse(this);
          }

          this.body = model;

      }

  });

  /**
   * Route for logining in a user
   */
  //router.post('')

  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = user
