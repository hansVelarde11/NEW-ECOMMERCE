const Order = require('../../models/Order');
const Product = require('../../models/Product')
//Funcionalidad 

exports.registerOrder = async (req, res) => {
    try {
        const { userId, productId, quantify } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const totalAmount = product.price * quantify;

        const newOrder = await Order.create({
            userId,
            productId,
            totalAmount,
            quantify,
            status: 'pendiente',
            createdAt: new Date(), 
        });
        res.status(201).json({ message: 'Orden registrada', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la orden', error });
    }
};