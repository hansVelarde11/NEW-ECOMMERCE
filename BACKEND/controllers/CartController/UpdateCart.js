const Cart = require('../../models/Cart');
const CartItem = require('../../models/CartItem');

// PUT /cart/items/:productId
exports.updateCartItemQuantity = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ where: { userId } });
    const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });

    if (!cartItem) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cantidad del producto' });
  }
};