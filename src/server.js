"use strict"

var koa = require('koa');
var mongoose = require("mongoose");
var bodyParser = require('koa-bodyparser');
var session = require('koa-session');
var app = koa();

app.keys = ["h4ckerbio"];

mongoose.connect('mongodb://biohacks:hacker@ds037095.mongolab.com:37095/biohacks', {
    user: 'biohacks',
    pass: 'hacker'
});

//Global middleware
app.use(bodyParser());

app.use(session({maxAge: 900000},app)); //reset 15 minutes at each request 

app.use(function *(next){
    this.type = 'json';
    yield next;
})

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

//routes
require('./routes/user')(app);



app.listen(3000);
