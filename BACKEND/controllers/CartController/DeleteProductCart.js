const Cart = require('../../models/Cart')
const CartItem = require('../../models/CartItem')

exports.removeItemFromCart = async (req, res) => {
    const userId = req.user.userId;
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ where: { userId } });
        const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });

        if (!cartItem) return res.status(404).json({ error: 'Producto no encontrado en el carrito' });

        await cartItem.destroy();
        res.status(200).json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
    }
};