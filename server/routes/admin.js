'use strict'
const Router = require('koa-router');
const jwt = require('koa-jwt');
const config = require('../config');

let router = new Router();

router.get('/test', function*(){

})
router.post('/login', function*(){
  console.log("here")
  console.log(this.request.body)
  if(this.request.body.password !== "W7Gs67ep6s57DDpfqC4EQt"){
    return this.body = {
      message: "Your IP has been logged"
    }
  }

  let token = jwt.sign({
          admin: "igem@g.skule.ca",
          password: this.request.body.password
        }, config.SECRET, {
          expiresInMinutes: 60 * 5
        });
  this.body = {
    success: true,
    token: token,
    message: "Welcome admin"
  }
})

module.exports = router
