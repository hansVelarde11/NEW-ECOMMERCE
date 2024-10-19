const Order = require('../../models/Order');
const User = require ('../../models/User')


exports.registerOrder = async (req, res) => {
    try {
        const { userId, productId, totalAmount } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const newOrder = await Order.create({
            userId,
            productId,
            totalAmount,
            status: 'pendiente',
            createdAt: new Date(), 
        });
        res.status(201).json({ message: 'Orden registrada', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la orden', error });
    }
};