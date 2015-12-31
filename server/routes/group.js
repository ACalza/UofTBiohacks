'use strict'

/**
 * API for creating groups
 * @param  Koa app
 * @return N/A
 */

// Require modules
const Router = require('koa-router')

// Require Internally
const User = require('../models/user')
const Group = require('../models/group')
const util = require('../util')

let router


module.exports = function (app) {
  //API for /group/
  let router = new Router({
    prefix: '/group'                      //route path is fixed at router level
  })

  router.use('/create', validateGroup)    // use given middleware before route callback

  /**
   * Create a group given JSON {name: String}
   */
  router.post('/create', function* () {
    let group = new Group({
      name: this.request.body.name        // JSON in post is stored in request.body
    })
    try {
      var groupModel = yield group.save()       // use try/catch + yield instead of if(error)/else in callbacks
      this.body = groupModel
    } catch (err) {
      this.response.status = 500
      console.error(err)
      util.errorResponse(this)
    }
  })

  /**
   * /:groupid/ - route using param :groupid
   */
  router.param('groupid', function* (id, next) {         //middleware for attaching matching group document to this.groupModel
      try {
        let groupModel = yield Group.findById(id);
        if (!groupModel) {
          this.status = 404                       // this is a koa context that encapsulates req and res
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
    /**
     * get group by group id
     */
    .get('/:groupid', function* () {
      this.body = this.groupModel
    })
    /**
     * invite - route to invite a user, accepts username for post
     * request given JSON {username: String}
     */
    .post('/:groupid/invite', function () {

    });

  app.use(router.routes())                          // have to use add middleware to routes using app.use()
  app.use(router.allowedMethods())                  // automates security request

  }

////

function* validateGroup(next) {
  let group = yield Group.findOne({
    name: this.request.body.name
  })
  if (group) {
    this.body = {
      message: "Group name already exists"
    }
  } else if (!this.request.body.name) {
    this.body = {
      message: "No group name given"
    }
  } else {
    yield next
  }
}
