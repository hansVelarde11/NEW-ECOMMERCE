const Order = require('../../models/Order');


exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const order = await Order.findOne({ where: { id, userId } });

        if (!order) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el pedido' });
    }
};
