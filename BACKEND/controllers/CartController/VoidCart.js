const Cart = require('../../models/Cart')

exports.clearCart = async (req, res) => {
    try {
        const { userId } = req.body;

        await Cart.destroy({ where: { userId } });
        res.status(200).json({ message: 'Carrito vaciado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al vaciar el carrito', error });
    }
};
