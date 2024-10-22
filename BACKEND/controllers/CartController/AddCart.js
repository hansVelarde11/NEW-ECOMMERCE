const Cart = require('../../models/Cart')
const Product = require('../../models/Product')

exports.AddProduct = async (req, res) => {
    try {
        const {userId, productId, quantify } = req.body;


        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ messagge: 'Producto no encontrado'});
        }
        let cartProduct = await Cart.findOne ({where: {userId, productId}});


        if (cartProduct) {
            cartProduct.quantify += quantify;
            await cartProduct.save();
        }else{
            cartProduct = await Cart.create({ userId, productId, quantiy});
        }
        res.status(201).json({messagge: 'Producto agregado al carrito ', cartProduct})
    } catch (error) {
        res.status(500).json({messagge: 'Producto no agregado al carrito', error})
    }
};
