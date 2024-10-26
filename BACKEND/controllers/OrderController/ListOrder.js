const Order = require('../../models/Order');

exports.getUserOrders = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const orders = await Order.findAll({ where: { userId } });
  
      if (orders.length === 0) {
        return res.status(404).json({ error: 'No se encontraron pedidos para este usuario' });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los pedidos del usuario' });
    }
  };
  