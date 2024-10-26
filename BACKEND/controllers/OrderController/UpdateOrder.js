const Order = require('../../models/Order');

exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params; 
    const { status } = req.body; 
    console.log("Datos de usuario en req.user:", req.user);
    const userId = req.user.id; 

    try {
        const order = await Order.findOne({ where: { id, userId } });

        if (!order) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        order.status = status; 
        await order.save(); 

  
        res.status(200).json({
            success: true,
            message: 'Estado del pedido actualizado correctamente',
            order: order 
        });
    } catch (error) {
        
        res.status(500).json({ 
            success: false,
            error: 'Error al actualizar el estado del pedido',
            details: error.message 
        });
    }
};
