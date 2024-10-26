const Cart = require('../../models/Cart'); // Asegúrate de que esta línea esté presente
const CartItem = require('../../models/CartItem');
const Order = require('../../models/Order');
const OrderItem = require('../../models/OrderItem')

exports.createOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    // Obtener el carrito del usuario
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    // Obtener los artículos del carrito
    const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    // Calcular el total
    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Crear el pedido
    const order = await Order.create({ userId, totalAmount });

    // Agregar los artículos del carrito a la orden
    for (const item of cartItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId, // Asegúrate de que `item` tenga `productId`
        quantity: item.quantity,
        price: item.price
      });
      
      // Eliminar los items del carrito después de crear el pedido
      await item.destroy();
    }

    res.status(201).json({ orderId: order.id, totalAmount });
  } catch (error) {
    console.error("Error en createOrder:", error); // Imprimir el error en la consola
    res.status(500).json({ error: 'Error al crear el pedido', details: error.message });
  }
};
