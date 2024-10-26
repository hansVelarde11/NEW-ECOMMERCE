const Cart = require('../../models/Cart');
const CartItem = require('../../models/CartItem');

exports.getCartItems = async (req, res) => {
  const userId = req.user.id;

  try {
    // Buscar el carrito del usuario
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    // Obtener todos los items del carrito del usuario
    const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos del carrito' });
  }
};
