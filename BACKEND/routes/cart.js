const express = require('express');
const router = express.Router();
const { AddProduct } = require('../controllers/CartController/AddCart');
const { checkout } = require('../controllers/CartController/CheckOut')
const { removeFromCart } = require('../controllers/CartController/DeleteProductCart')
const { updateCartQuantity } = require('../controllers/CartController/UpdateCart')
const { clearCart } = require('../controllers/CartController/VoidCart')
//

// Ruta para agregar un producto al carrito
router.post('/add', AddProduct);
router.post('/check', checkout);
router.delete('/delete-product', removeFromCart)
router.put('/update', updateCartQuantity)
router.delete('/delete', clearCart)
module.exports = router;
