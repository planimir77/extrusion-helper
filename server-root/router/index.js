const router = require('express').Router();
const users = require('./users');
const test = require('./test');
const shoppinglists = require('./shoppinglists');
const item = require('./item');

router.use('/shoppinglists', shoppinglists);
router.use('/item', item);
router.use('/users', users);
router.use('/test', test);

module.exports = router;
