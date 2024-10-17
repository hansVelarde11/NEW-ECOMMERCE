const express = require('express');
const router = express.Router();

const { DeleteOrder } = require ("../controllers/OrderController/DeleteOrder")
const { GetuserbyStatus} = require ("../controllers/OrderController/GetuserbyStatus")
const { RegistrarOrder } = require ("../controllers/OrderController/RegistarOrder")
const { UpdateOrder } = require ("../controllers/OrderController/UpdateOrder") 




router.post('/orders', RegistrarOrder);
router.get('/users/:userId/orders', GetuserbyStatus);
router.put('/orders/:orderId', UpdateOrder);
router.delete('/orders/:orderId', DeleteOrder);

module.exports = router;



module.exports = router;