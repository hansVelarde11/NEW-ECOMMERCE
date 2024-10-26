const express = require('express');
const router = express.Router();

const { createOrder } = require('../controllers/OrderController/CreateOrder');
const { deleteOrder } = require('../controllers/OrderController/DeleteOrder');
const { getOrderById } = require('../controllers/OrderController/GetOrderbyId');
const { getUserOrders } = require('../controllers/OrderController/ListOrder');
const { updateOrderStatus } = require('../controllers/OrderController/UpdateOrder');

const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para crear una nueva orden
router.post('/orders', authMiddleware, createOrder);

// Ruta para eliminar una orden por ID
router.delete('/orders/:id', authMiddleware, deleteOrder);

// Ruta para obtener una orden por ID
router.get('/orders/:id', authMiddleware, getOrderById);

// Ruta para obtener todas las órdenes del usuario
router.get('/orders', authMiddleware, getUserOrders);

// Ruta para actualizar el estado de una orden por ID
router.put('/orders/:id/status', authMiddleware, updateOrderStatus);

module.exports = router;
