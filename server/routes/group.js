'use strict'

/**
 * API for creating groups
 * @param  Koa app
 * @return N/A
 */

// Require modules
const Router = require('koa-router');

// Require Internally
const validateGroupName = require('../lib/validateGroupName');
const Group = require('../models/group');
const util = require('../util');

// new insteance of Router constructor
let router = new Router();

// Middleware: query database to ensure nonmatching group name is provided
router.use('/create', validateGroupName);

// POST: Create a new group given JSON {name: String} and save group into database
router.post('/create', saveGrouptoDatabase);

// Middleware: query database by group id and attach to this.groupModel
router.param('groupid', function* (id, next) {         //middleware for attaching matching group document to this.groupModel
    try {
      let groupModel = yield Group.findById(id);
      if (!groupModel) {
        this.status = 404                              // this is a koa context that encapsulates req and res
        util.errorResponse(this)
      } else {
        this.groupModel = groupModel
        yield next
      }
    } catch (err) {
      console.error(err)
      this.status = 500
      util.errorResponse(this)
    }
  })

// GET: sends group with attached group info. although i think should be able to incorporate with router.param.
    .get('/:groupid', function* () {
  this.body = this.groupModel;
})

//POST: invite - route to invite a user, accepts username for post
// request given JSON {username: String}
    .post('/:groupid/invite', function () {
        //Use .invites to add the current group to the other user's invite array
});














/////////////////////////////////////////////////////////////////////////////////
// ==> FUNCTION <== //

function* saveGrouptoDatabase(){
  let group = new Group({
    name: this.request.body.name           // JSON in post is stored in request.body
  })
  try {
    var groupModel = yield group.save()    // use try/catch + yield instead of if(error)/else in callbacks
    this.body = groupModel
  } catch (err) {
    this.response.status = 500
    console.error(err)
    util.errorResponse(this)
  }
}


module.exports = router;
