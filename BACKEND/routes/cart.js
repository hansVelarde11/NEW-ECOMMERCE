const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const { addItemtoCart } = require('../controllers/CartController/addItemCart');
const { checkoutCart } = require('../controllers/CartController/CheckOut');
const { removeItemFromCart } = require('../controllers/CartController/DeleteProductCart');
const { updateCartItemQuantity } = require('../controllers/CartController/UpdateCart');
const { getCartItems } = require('../controllers/CartController/GetCartItem');
const { CreateCart } = require('../controllers/CartController/NewCart');


router.get('/', authMiddleware, getCartItems);

router.post('/new', authMiddleware, CreateCart);

router.post('/add', authMiddleware, addItemtoCart);

router.post('/checkout', authMiddleware, checkoutCart);

router.delete('/items/:itemId', authMiddleware, removeItemFromCart);

router.put('/items/:itemId', authMiddleware, updateCartItemQuantity);

module.exports = router;
