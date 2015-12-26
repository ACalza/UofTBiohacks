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
      let email = this.request.email;
      
      if(!email){
          this.response.status = 400;
          util.errorResponse(this);
      }

  });

  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = user
