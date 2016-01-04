'use strict'

/**
 * API for creating groups
 * @param  Koa app
 * @return N/A
 */

// Require modules
const Router = require('koa-router');

// Require Internally
const groupMiddlewares = require('./groupMiddlewares');

// new insteance of Router constructor
let router = new Router();

// Middleware: query database to ensure nonmatching group name is provided
router.use('/create', groupMiddlewares.validateGroupName);

// POST: Create a new group given JSON {name: String} and save group into database
router.post('/create', groupMiddlewares.saveGrouptoDatabase);

// Middleware: query database by group id and attach to this.groupModel
router.param('groupid', groupMiddlewares.findGroupbyId);

// GET: sends group with attached group info. although i think should be able to incorporate with router.param.
router.get('/:groupid', function* () {
  this.body = this.groupModel;
})

//POST: invite - route to invite a user, accepts username for post
router.post('/:groupid/invite', function () {
        //Use .invites to add the current group to the other user's invite array
});


module.exports = router;
