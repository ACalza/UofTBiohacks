"use strict"
let util = require('../util');
let config = require('../config');
let jwt = require('koa-jwt');
const User = require('../models/user');
/**
 * authenticates the user using the JWT token and our secret
 * @param  Koa Object next
 * @return N/A
 */
function* authenticateUser(next){
    try {
        let token = this.request.header.authorization.split(" ")[1];
        console.log(token)
        let decoded = jwt.verify(token, config.SECRET);
        if(decoded.admin === "igem@g.skule.ca" && decoded.password === "W7Gs67ep6s57DDpfqC4EQt"){
          yield next
        }else{
          this.userModel = decoded.userModel;

          //re-populate
          this.userModel = yield User.findById(this.userModel._id)
          yield next
        }
      } catch(err) {
          console.error(err)
          this.response.status = 403;
          util.errorResponse(this);
      }
}
module.exports = authenticateUser;
