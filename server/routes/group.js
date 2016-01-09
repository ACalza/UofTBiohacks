'use strict'

// Require modules
const Router = require('koa-router');
const groupMiddlewares = require('./groupMiddlewares');

// new insteance of Router constructor
let router = new Router();

// ROUTES
router.use('/create', groupMiddlewares.validateGroupName);
router.post('/create', groupMiddlewares.saveGrouptoDatabase);


router.param('groupid', groupMiddlewares.findGroupbyId);
router.get('/:groupid', function* () {      // GET: sends group with attached group info.
  this.body = this.groupModel;
})
router.post('/:groupid/invite', groupMiddlewares.inviteUsertoGroup);

router.get('/:groupid/accept', groupMiddlewares.acceptInvite);

module.exports = router;
