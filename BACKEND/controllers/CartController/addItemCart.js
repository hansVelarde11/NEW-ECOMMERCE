const Cart = require('../../models/Cart');
const CartItem = require('../../models/CartItem');
const Product = require('../../models/Product'); // Importa el modelo de producto

exports.addItemtoCart = async (req, res) => {
  console.log("Usuario en addItemToCart:", req.user); 
  const { productId, quantity } = req.body; 
  const userId = req.user.id;

  try {
   
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado para este usuario' });
    }

    // Obtener el precio del producto desde la base de datos
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const price = product.price; 
    if (price == null) {
      return res.status(500).json({ error: 'Precio del producto no disponible' });
    }

  
    let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });

    if (cartItem) {
  
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Si no está, crea un nuevo item en el carrito con el precio del producto
      cartItem = await CartItem.create({ cartId: cart.id, productId, quantity, price });
    }

    res.status(200).json(cartItem);
  } catch (error) {
    console.error("Error en addItemToCart:", error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};
