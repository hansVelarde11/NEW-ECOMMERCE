const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

exports.checkout = async (req, res) => {
    try {
        const { userId } = req.body;

    
        const cartItems = await Cart.findAll({ where: { userId } });

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }

        let totalAmount = 0;
        const orderItems = [];

        
        for (const item of cartItems) {
            const product = await Product.findByPk(item.productId);
            
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            totalAmount += product.price * item.quantity;

 

            orderItems.push({
                userId,
                productId: item.productId,
                totalAmount: product.price * item.quantity,
                quantity: item.quantity,
                status: 'comprado', 
            });
        }

        
        const newOrder = await Order.bulkCreate(orderItems);

        res.status(201).json({ message: 'Orden creada y productos marcados como comprados', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error al realizar el checkout', error });
    }
};
