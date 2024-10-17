const Order = require('../../models/Order');


exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        order.status = 'eliminada';
        await order.save();

        res.status(200).json({ message: 'Orden eliminada ' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la orden', error });
    }
};
