const Cart = require('../../models/Cart')

exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId} = req.body;

        const cartProduct = await Cart.findOne({where: {userId, productId}});
        if (!cartProduct) {
            return res.status(404).json({ message:'Producto del carrito no encontrado'});
        }

        await cartProduct.destroy();
        res.status(200).json({ message: 'Producto eliminado del carrito'});
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar el producto del carrito', error});
    }
}