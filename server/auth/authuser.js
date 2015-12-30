"use strict"
let util = require('../util');
let config = require('../config');
let jwt = require('koa-jwt');

/**
 * authenticates the user using the JWT token and our secret
 * @param  Koa Object next
 * @return N/A
 */
function* authenticateUser(next){
    try {
        let token = this.request.header.authorization.split(" ")[1];
        let decoded = jwt.verify(token, config.SECRET);
        this.userModel = decoded.userModel;
        yield next
      } catch(err) {
          this.response.status = 403;
          util.errorResponse(this);
      }
}
module.exports = authenticateUser;
