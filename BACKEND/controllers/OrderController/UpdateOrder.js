const Order = require('../../models/Order'); // Importamos el modelo de Order


exports.updateOrder = async (req, res) =>{
    try {
        const { id } = req.params;
        const { productId, totalAmount } = req.body;

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({message: 'Orden no encontrada '});
        }
        order.productId = productId || order.productId;
        order.totalAmount = totalAmount || order.totalAmount;

        await order.save();

        res.status(200).json({message: 'Orden Actualizada ', order});

    } catch (error){
        res.status(500).json({ message: 'Error al actualizar la orden ', error});
    }
};