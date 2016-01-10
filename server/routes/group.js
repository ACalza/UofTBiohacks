'use strict'

// Require modules
const Router = require('koa-router');
const groupMiddlewares = require('./groupMiddlewares');

// new insteance of Router constructor
let router = new Router();

// ROUTES
router.get('/', groupMiddlewares.getAllGroups);

router.use('/create', groupMiddlewares.validateGroupName);
router.post('/create', groupMiddlewares.saveGrouptoDatabase);

router.param('groupid', groupMiddlewares.findGroupbyId);
router.get('/:groupid', function* () {      // GET: sends group with attached group info.
  this.body = this.groupModel;
})
router.post('/:groupid/invite', groupMiddlewares.inviteUserstoGroup);
router.get('/:groupid/accept', groupMiddlewares.acceptInvite);


router.get('/:groupid/reject', groupMiddlewares.rejectInvite);
router.get('/:groupid/leave', groupMiddlewares.leaveGroup);

module.exports = router;
