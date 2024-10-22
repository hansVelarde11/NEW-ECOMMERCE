const Cart = require('../../models/Cart')

exports.updateCartQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cartItem = await Cart.findOne({ where: { userId, productId } });
        if (!cartItem) {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ message: 'Cantidad actualizada', cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la cantidad', error });
    }
};
