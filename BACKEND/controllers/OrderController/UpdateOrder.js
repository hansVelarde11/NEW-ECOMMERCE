const Order = require('../../models/Order'); 

exports.updateOrder = async (req, res) => {
    try {
        const { id, productId, totalAmount } = req.body; 

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

       
        if (productId) order.productId = productId;
        if (totalAmount) order.totalAmount = totalAmount;

        await order.save();

        res.status(200).json({ message: 'Orden actualizada', order });

    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la orden', error });
    }
};
