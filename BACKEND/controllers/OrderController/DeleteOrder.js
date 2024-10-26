const Order = require('../../models/Order');

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const order = await Order.findOne({ where: { id, userId } });

        if (!order) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        
        await order.destroy(); // Elimina el pedido

        res.status(200).json({
            success: true,
            message: 'Se elimino correctamente el producto'
        });



        res.status(204).json(); // No content
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el pedido' });
    }
};
