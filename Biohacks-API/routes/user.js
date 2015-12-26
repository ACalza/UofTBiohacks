"use strict"

let Router = require('koa-router');
let User = require('../models/user');

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
      this.body = "test";
      console.log(this.request.body);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = user
