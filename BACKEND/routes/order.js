const express = require('express');
const router = express.Router();

const { deleteOrder } = require ("../controllers/OrderController/DeleteOrder")
const { getUserOrdersByStatus} = require ("../controllers/OrderController/GetuserbyStatus")
const { registerOrder } = require ("../controllers/OrderController/RegistarOrder")
const { updateOrder } = require ("../controllers/OrderController/UpdateOrder") 

router.post('/', registerOrder);
router.post('/orders/getUserOrdersByStatus', getUserOrdersByStatus);
router.put('/updateOrder/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

module.exports = router;
