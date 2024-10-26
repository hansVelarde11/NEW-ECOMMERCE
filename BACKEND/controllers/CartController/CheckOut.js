const Cart = require('../../models/Cart');
const CartItem = require('../../models/CartItem');


exports.checkoutCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });
        // Aquí podrías procesar los productos (descontar stock, generar orden, etc.)

        // Limpiar el carrito después del checkout
        await CartItem.destroy({ where: { cartId: cart.id } });

        res.status(200).json({ message: 'Checkout exitoso' });
    } catch (error) {
        res.status(500).json({ error: 'Error durante el checkout' });
    }
};