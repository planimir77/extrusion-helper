const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { shoppinglistController } = require('../controllers');

// middleware that is specific to this router

router.get('/', auth() , shoppinglistController.getShoppinglists);
router.get('/favorite', auth(), shoppinglistController.getFavoriteShoppinglist);
router.get('/:id', shoppinglistController.getShoppinglist);
router.delete('/:id', auth() , shoppinglistController.deleteShoppinglist);
router.put('/add-item', auth() ,shoppinglistController.addShoppinglistItem);
router.post('/create', auth() ,shoppinglistController.createShoppinglist);
router.put('/remove-item', auth() ,shoppinglistController.deleteShoppinglistItem);
router.put('/not-favorite', auth() ,shoppinglistController.shoppinglistNotFavorite);
router.put('/favorite', auth() ,shoppinglistController.shoppinglistFavorite);

router.put('/:Id', auth(), shoppinglistController.updateShoppinglist);

//router.put('/:shoppinglistId/posts/:postId', auth(), shoppinglistController.editShoppinglist);
//router.delete('/:shoppinglistId/posts/:postId', auth(), shoppinglistController.deleteShoppinglist);

module.exports = router