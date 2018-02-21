'use strict'

require('dotenv').config()
// TODO use envalid
//
//
//

// Require Modules
const koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const jwt = require('koa-jwt');
const mount = require('koa-mount');
const logger = require('koa-logger');

// Require Internally
const util = require('./util.js');
const config = require('./config');
const authUser = require('./auth/authuser');

// Declare variable
var port = process.env.PORT || 3000;

// Instance of Koa
let app = koa();

const MONGO_HOST = process.env.MONGO_HOST || 'localhost'

// Connect to database
if (process.env.mongodblocal === 'true') {
  mongoose.connect('mongodb://localhost/biohacks')
} else {
  console.log(`Using mongo db: ${process.env.MONGO_DB}`)
  mongoose.connect(`mongodb://${MONGO_HOST}/${process.env.MONGO_DB}/`, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS
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

let exclusions = ["/user/login", "/user/register", "/user/forgot", /^\/user\/reset\/.*/, "/user/reset",
                                "/user/verify", /^\/user\/verify\/.*/, "/admin/login", "/admin/reject"]
// authorization middleware
app.use(jwt({ secret: config.SECRET }).unless({ path: exclusions}));
authUser.unless = require('koa-unless');
app.use(authUser.unless({path: exclusions }));


// Mount Routor: Route Path is fixed at the Router level
app.use(mount('/user', require('./routes/user').middleware()));         //Routes for User
app.use(mount('/group', require('./routes/group').middleware()));       //Routes for Group
app.use(mount('/admin', require('./routes/admin').middleware()));  //routes for admin

// TODO promise.all(dbs and shit) first
app.listen(port)
  .on('listening', () => console.log(`Koa server listening on port ${port}`))
