'use strict'
const Router = require('koa-router');
const jwt = require('koa-jwt');
const config = require('../config');
const User = require('../models/user');


let router = new Router();

router.post('/reject', function*(){
  if (this.request.body.password !== config.admin_pass)
    return this.body = {
      response: "Forbidden"
    }
  let data = yield User.find({isinvited: true, doesAcceptInvite: undefined})
  for (let i = 0; i< data.length; i++){
    yield User.update({_id: data[i]._id}, {$set: {doesAcceptInvite: false}})
  }
  this.body = {
    response: "success"
  }
})
router.get('/all', function*(){
  let data = yield User.find({isinvited: false})
  this.body = {
    data: data
  }
})

router.post('/login', function*(){
  if(this.request.body.password !== config.admin_pass){
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
    jwt: token,
    message: "Welcome admin"
  }
})

router.post('/acceptuser', function*(){
  try {
    yield User.update({_id: this.request.body._id}, {isinvited: true})
    this.body = {
      message: "Successfully invited " + this.request.body.firstName + " " + this.request.body.lastName
    }
  }catch(err){
    this.response.status = 500
    console.error(err)
    util.errorResponse(this)
  }
})

module.exports = router
