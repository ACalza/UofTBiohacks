'use strict'

// Require Modules
const koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const jwt = require('koa-jwt');
const mount = require('koa-mount');
const logger = require('koa-logger');

// Require Internally
const util = require('./util');
const config = require('./config');
const authUser = require('./auth/authuser');

// Declare variable
var port = process.env.BIOHACKS_PORT || 3000;

// Instance of Koa
let app = koa();

// Connect to database
if (process.env.mongodblocal === 'true') {
  mongoose.connect('mongodb://localhost/biohacks')
} else {
  mongoose.connect('mongodb://biohacks:hacker@ds037095.mongolab.com:37095/biohacks', {
    user: 'biohacks',
    pass: 'hacker'
  })
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongoDB')
});

// Global middleware
app.use(logger());
app.use(require('koa-validate')());       // gives context functionailities
app.use(cors());
app.use(bodyParser());                    // parsing POST form data and populate req.body
app.use(function* (next) {                // set content type to JSON
  this.type = 'json';
  yield next;
});

// authorization middleware  should be here???
app.use(jwt({ secret: config.SECRET }).unless({ path: ["/user/login", "/user/register", "/user/forgot", /^\/user\/reset\/.*/] }));
authUser.unless = require('koa-unless');
app.use(authUser.unless({path: ["/user/login", "/user/register", "/user/forgot", /^\/user\/reset\/.*/] }));


// Mount Routor: Route Path is fixed at the Router level
app.use(mount('/user', require('./routes/user').middleware()));         //Routes for User
app.use(mount('/group', require('./routes/group').middleware()));       //Routes for Group
//

app.listen(port)
console.log(`Koa server listening on port ${port}`)
