"use strict"
const Router = require('koa-router');
const User = require('../models/user');
const Group = require('../models/group');
const util = require('../util');

/**
 * API for creating groups
 * @param  Koa app
 * @return N/A
 */
function group(app){
    //API for /group/
    let router = new Router({
        prefix: '/group'
    });

    router.use('/create', validateGroup)
    /**
     * Create a group
     */
    router.post('/create', function*(){
         let group = new Group({
             name: this.request.body.name
         });

         try{
             var groupModel = yield group.save();
             this.body = groupModel;
         }catch(err){
             this.response.status = 500;
             util.errorResponse(this);
         }
     });
     app.use(router.routes());
     app.use(router.allowedMethods());
}
function* validateGroup(next){
    let group = yield Group.findOne({name: this.request.body.name});
    if(group){
        this.body = {
            message: "Group name already exists"
        }
    }else if(!this.request.body.name){
        this.body = {
            message: "No group name given"
        }
    }else{
        yield next
    }
}
module.exports = group
